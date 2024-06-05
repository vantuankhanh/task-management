const { db } = require("../../connection/firebase.connection");
const { errorHandler } = require("../../loggers/errorHandler");
const { response } = require("../../utils/responseBuilder");
const { hashPassword } = require("../../utils/hashBcrypt");
const { sendEmail } = require("../../connection/mailtrrap.connection");

const { APP_URL } = process.env;

const getEmployee = async (req, res, next) => {
  try {
    console.log("----------> Get employee");

    const id = req.body.id;
    const role = req.body.role;
    let snapshot;

    let employeeRef = db.collection("employee");
    if (role === 0 || role === 1) {
      employeeRef = employeeRef.where("role", "==", role);
    }

    if (id) {
      snapshot = [await employeeRef.doc(id).get()];
    } else {
      snapshot = await employeeRef.get();
    }

    let data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return response(
      res,
      data,
      `Successfully get employee${id ? ` ${data[0].email}` : ""}`,
      200
    );
  } catch (error) {
    errorHandler(error, "get employee");
    response(res, null, "Internal server error", 500);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    console.log("----------> Create employee");

    const { name, email, phoneNumber, address, password, role } = req.body;

    let hashedPassword = "";
    if (password) hashedPassword = await hashPassword(password);

    if (!name || !email || !phoneNumber) {
      return response(
        res,
        { success: false },
        "Required name, email, phoneNumber of employee!",
        400
      );
    }

    if (!phoneNumber.replace("+", "").match(/^\d+$/))
      response(
        res,
        { success: false },
        "Phone number has to be numerical",
        400
      );

    const employeeRef = db.collection("employee");
    const emailSnap = await employeeRef.where("email", "==", email).get();
    if (emailSnap.docs.length > 0) {
      return response(res, { success: false }, "Email has been used", 409);
    }
    const phoneSnap = await employeeRef
      .where("phoneNumber", "==", phoneNumber)
      .get();
    if (phoneSnap.docs.length > 0) {
      return response(
        res,
        { success: false },
        "Phone number has been used",
        409
      );
    }

    const ans = await employeeRef.add({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address: address ?? "",
      role,
      status: true,
      sys_entry_date: new Date().toISOString(),
    });

    const send = await sendEmail(
      email,
      "ACCOUNT CREATED",
      `You have been created an account for Task Manager.\nPlease create your password via: ${APP_URL}/auth/signup-email?id=${ans.id}`
    );

    return response(
      res,
      { success: true, sendEmail: send, employeeId: ans.id },
      "Successfully created employee",
      201
    );
  } catch (error) {
    errorHandler(error, "create employee");
    response(res, { success: false }, "Internal server error", 500);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    console.log("----------> Update employee");

    const id = req.body.id;

    if (!id) {
      return response(res, { success: false }, "Required id of employee", 400);
    }

    const employeeRef = db.collection("employee");
    const employeeSnap = await employeeRef.doc(id).get();
    if (!employeeSnap.exists) {
      return response(res, { success: false }, "Employee's not existed", 400);
    }

    const updates = {};

    if (req.body.email) {
      const employeeFilterEmail = await employeeRef
        .where("email", "==", req.body.email)
        .get();
      let data = [];
      employeeFilterEmail.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      if (data.length > 0 && data.filter((d) => d.id !== id).length > 0) {
        return response(res, { success: false }, "Email's been used", 409);
      }
      updates.email = req.body.email;
    }
    if (req.body.password) updates.password = await hashPassword(password);
    if (req.body.phoneNumber) {
      const employeeFilterPhone = await employeeRef
        .where("phoneNumber", "==", req.body.phoneNumber)
        .get();
      let data = [];
      employeeFilterPhone.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      if (data.length > 0 && data.filter((d) => d.id !== id).length > 0) {
        return response(
          res,
          { success: false },
          "Phone number's been used",
          409
        );
      }

      updates.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.name) updates.name = req.body.name;
    if (req.body.address) updates.address = req.body.address;
    if (req.body.role) updates.role = req.body.role;
    if (req.body.status) updates.status = req.body.status;

    await employeeRef.doc(id).update({
      ...updates,
      sys_entry_date: new Date().toISOString(),
    });

    return response(
      res,
      { success: true },
      "Successfully updated employee",
      201
    );
  } catch (error) {
    errorHandler(error, "update employee");
    response(res, { success: false }, "Internal server error", 500);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    console.log("----------> Delete employee");

    const { id } = req.body;

    if (!id) {
      return response(
        res,
        { success: false },
        "Required email of employee",
        400
      );
    }

    await db.collection("employee").doc(id).delete();
    return response(
      res,
      { success: true },
      "Successfully deleted employee",
      201
    );
  } catch (error) {
    errorHandler(error, "delete employee");
    response(res, { success: false }, "Internal server error", 500);
  }
};

module.exports = {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
