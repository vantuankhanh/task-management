const { db } = require("../../connection/firebase.connection");
const { errorHandler } = require("../../loggers/errorHandler");
const { response } = require("../../utils/responseBuilder");
const { sendMessage } = require("../../connection/twilio.connection");
const {
  GenerateAccessToken,
  GenerateRefreshToken,
} = require("../../utils/generateJWT");
const checkDataExist = require("../../utils/checkDataExist");
const { sendEmail } = require("../../connection/mailtrrap.connection");

const createNewAccessCode = async (req, res, next) => {
  try {
    console.log("----------> Create access code and send message");

    const { phoneNumber, email, type } = req.body;

    if (!type || !["email", "phoneNumber"].includes(type)) {
      return response(
        res,
        { sendMessage: false },
        "Type has to be provided!",
        400
      );
    }
    if (!phoneNumber && type === "phoneNumber") {
      return response(
        res,
        { sendMessage: false },
        "Required phoneNumber to send message!",
        400
      );
    }

    if (!email && type === "email") {
      return response(
        res,
        { sendMessage: false },
        "Required email to send message!",
        400
      );
    }

    let checkExist = false;
    if (type === "phoneNumber")
      checkExist = await checkDataExist("employee", [
        `phoneNumber == ${phoneNumber}`,
      ]);
    else checkExist = await checkDataExist("employee", [`email == ${email}`]);

    if (!checkExist) {
      return response(res, { sendMessage: false }, "Employee not found!", 400);
    }

    let code = 0;
    let message = "Your access code is: ";
    const accessRef = db.collection("accessCode");

    let snapshot;

    if (type === "phoneNumber")
      snapshot = await accessRef.doc(phoneNumber).get();
    else snapshot = await accessRef.doc(email).get();

    if (snapshot.exists) {
      const date = Date.parse(snapshot.data().sys_entry_date);
      if (Date.now() - date < 30000) {
        code = snapshot.data().accessCode;
        message += snapshot.accessCode;
      } else {
        code = Math.floor(Math.random() * 900000) + 100000;
        message += code;
      }
    } else {
      code = Math.floor(Math.random() * 900000) + 100000;
      message += code;
    }

    let sendResult;
    if (type === "phoneNumber") {
      accessRef.doc(phoneNumber).set({
        accessCode: code.toString(),
        sys_entry_date: new Date().toISOString(),
      });
      sendResult = await sendMessage(phoneNumber, message);
      if (sendResult)
        return response(
          res,
          { sendMessage: true },
          `Successfully send message to ${phoneNumber}`,
          201
        );
    } else {
      accessRef.doc(email).set({
        accessCode: code.toString(),
        sys_entry_date: new Date().toISOString(),
      });
      sendResult = await sendEmail(email, "VERIFY", message);
      if (sendResult)
        return response(
          res,
          { sendMessage: true },
          `Successfully send message to ${email}`,
          201
        );
    }

    return response(res, sendResult, "Internal server error", 500);
  } catch (error) {
    errorHandler(error, "create new access code");
    response(res, error, "Internal server error", 500);
  }
};

const validateAccessCode = async (req, res, next) => {
  try {
    console.log("----------> Validate access code");

    const { phoneNumber, email, type, accessCode } = req.body;

    if (!type || !["email", "phoneNumber"].includes(type)) {
      return response(
        res,
        { sendMessage: false },
        "Required type to send message!",
        400
      );
    }

    const accessRef = db.collection("accessCode");
    let employeeSnap = db.collection("employee").where("status", "==", true);
    let snapshot;

    if (type === "phoneNumber")
      snapshot = await accessRef.doc(phoneNumber).get();
    else snapshot = await accessRef.doc(email).get();

    if (snapshot.exists && snapshot.data().accessCode == accessCode) {
      if (type === "phoneNumber")
        employeeSnap = employeeSnap.where("phoneNumber", "==", phoneNumber);
      else employeeSnap = employeeSnap.where("email", "==", email);
      employeeSnap = await employeeSnap.get();

      if (employeeSnap.docs.length === 0) {
        return response(res, { success: false }, "Employee not found", 400);
      }

      let data = [];
      employeeSnap.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      const d = data[0];
      const accessToken = GenerateAccessToken({
        name: d.name,
        email: d.email,
        phoneNumber: d.phoneNumber,
        role: d.role,
        id: d.id,
      });
      const refreshToken = GenerateRefreshToken({
        name: d.name,
        email: d.email,
        phoneNumber: d.phoneNumber,
        role: d.role,
        id: d.id,
      });

      return response(
        res,
        { success: true, accessToken, refreshToken },
        `Validation for ${phoneNumber ?? ""}${email ?? ""} has been successful`,
        201
      );
    }

    return response(
      res,
      { success: false },
      `Validation for ${phoneNumber ?? ""}${email ?? ""} has failed`,
      400
    );
  } catch (error) {
    errorHandler(error, "validate access code");
    response(res, error, "Internal server error", 500);
  }
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
};
