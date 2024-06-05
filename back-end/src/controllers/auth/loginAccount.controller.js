const { db } = require("../../connection/firebase.connection");
const { errorHandler } = require("../../loggers/errorHandler");
const { response } = require("../../utils/responseBuilder");
const { hashPassword } = require("../../utils/hashBcrypt");
const {
  GenerateAccessToken,
  GenerateRefreshToken,
} = require("../../utils/generateJWT");
const jwt = require("jsonwebtoken");
const { compareHashPassword } = require("../../utils/hashBcrypt");

const loginAccount = async (req, res) => {
  try {
    console.log("----------> Login Account");

    const { email, password } = req.body;

    if (!email || !password) {
      return response(res, null, "Required email and password!", 400);
    }

    const employeeSnap = await db
      .collection("employee")
      .where("status", "==", true)
      .where("email", "==", email)
      .get();

    if (employeeSnap.docs.length === 0) {
      return response(res, null, "Wrong email or password!", 400);
    }

    let data = [];
    employeeSnap.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    const d = data[0];

    const checkPassword = await compareHashPassword(password, d.password);
    if (!checkPassword) {
      return response(res, null, "Wrong email or password!", 401);
    }

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
      `Logged in successfully.`,
      201
    );
  } catch (error) {
    errorHandler(error, "create new access code");
    response(res, error, "Internal server error", 500);
  }
};

const refreshToken = async (req, res) => {
  try {
    console.log("----------> Get refresh token");

    const authHeaders = req.headers["authorization"];

    if (!authHeaders) {
      return response(res, null, "Can not find authorization header", 401);
    }

    const checkBearer = authHeaders.includes("Bearer");
    if (!checkBearer) {
      return response(res, null, "Do not have Bearer", 401);
    }

    const token = authHeaders.replace("Bearer ", "");
    if (!token || token == "null") {
      return response(res, null, "Unauthorized", 401);
    }

    const decodedJWT = jwt.decode(token);
    const refresh_token = GenerateRefreshToken({
      name: decodedJWT.name,
      email: decodedJWT.email,
      phoneNumber: decodedJWT.phoneNumber,
      role: decodedJWT.role,
      id: decodedJWT.id,
    });
    response(
      res,
      { refresh_token: refresh_token },
      "Get refresh token succesfully",
      200
    );
  } catch (error) {
    errorHandler(error, "refresh token");
    response(res, error, "Internal server error", 500);
  }
};

const createPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const id = req.body.id;

    if (!id) {
      return response(res, null, "Required id", 400);
    }
    if (!password) {
      return response(res, null, "Required password", 400);
    }

    const passwordHashed = await hashPassword(password);

    const employeeRef = db.collection("employee").doc(id);
    await employeeRef.update({
      password: passwordHashed,
      sys_entry_date: new Date().toISOString(),
    });

    return response(
      res,
      { success: true },
      "Successfully created password",
      201
    );
  } catch (error) {
    errorHandler(error, "create password");
    response(res, { success: false }, "Internal server error", 500);
  }
};

module.exports = {
  loginAccount,
  refreshToken,
  createPassword,
};
