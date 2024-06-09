const { db } = require("../../connection/firebase.connection");
const { errorHandler } = require("../../loggers/errorHandler");
const { response } = require("../../utils/responseBuilder");
const checkDataExist = require("../../utils/checkDataExist");

const getTask = async (req, res, next) => {
  try {
    console.log("----------> Get task");

    const { employeeId } = req.body;

    let employeeSnap = await db.collection("employee").get();
    let employee = {};
    employeeSnap.forEach((doc) => (employee[doc.id] = doc.data()));

    let snapshot;
    const taskRef = db.collection("task");
    if (employeeId) {
      snapshot = await taskRef.where("employeeId", "==", employeeId).get();
    } else {
      snapshot = await taskRef.get();
    }

    let data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        employeeEmail: employee[d.employeeId].email,
        ...d,
      };
    });

    return response(res, data, `Successfully get task`, 200);
  } catch (error) {
    errorHandler(error, "get task");
    response(res, null, "Internal server error", 500);
  }
};

const createTask = async (req, res, next) => {
  try {
    console.log("----------> Create task");

    const { employeeId, content, dateStart, dateEnd, lastUpdatedBy } = req.body;

    if (!employeeId || !content || !dateStart || !dateEnd || !lastUpdatedBy) {
      return response(
        res,
        { success: false },
        "Required employeeId, content, dateStart, dateEnd, lastUpdatedBy!",
        400
      );
    }

    const empSnap = await db.collection("employee").doc(employeeId).get();
    const userSnap = await db.collection("employee").doc(lastUpdatedBy).get();
    if (!empSnap.exists || !userSnap.exists) {
      return response(res, { success: false }, "Employee not found!", 400);
    }

    if (Date.parse(dateStart) > Date.parse(dateEnd)) {
      return response(
        res,
        { success: false },
        "dateStart have to be before dateEnd!",
        400
      );
    }

    const taskRef = db.collection("task");
    const ans = await taskRef.add({
      employeeId,
      content,
      dateStart,
      dateEnd,
      status: 0,
      lastUpdatedBy,
      sys_entry_date: new Date().toISOString(),
    });

    return response(
      res,
      { success: true, taskId: ans.id },
      "Successfully created task",
      201
    );
  } catch (error) {
    errorHandler(error, "create task");
    response(res, { success: false }, "Internal server error", 500);
  }
};

const updateTask = async (req, res, next) => {
  try {
    console.log("----------> Update task");

    const { id, lastUpdatedBy } = req.body;

    if (!id) {
      return response(res, { success: false }, "Required id of task", 400);
    }
    if (!lastUpdatedBy) {
      return response(res, { success: false }, "Required lastUpdatedBy", 400);
    }

    const taskRef = db.collection("task").doc(id);
    const taskSnap = await taskRef.get();
    if (!taskSnap.exists) {
      return response(res, { success: false }, "Task's not existed", 400);
    }

    const updates = {};

    if (req.body.employeeId) updates.employeeId = req.body.employeeId;
    if (req.body.content) updates.content = req.body.content;
    if (req.body.dateStart) updates.dateStart = req.body.dateStart;
    if (req.body.dateEnd) updates.dateEnd = req.body.dateEnd;
    if (req.body.status) updates.status = req.body.status;

    await taskRef.update({
      ...updates,
      lastUpdatedBy,
      sys_entry_date: new Date().toISOString(),
    });

    return response(res, { success: true }, "Successfully updated task", 201);
  } catch (error) {
    errorHandler(error, "update task");
    response(res, { success: false }, "Internal server error", 500);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    console.log("----------> Delete task");

    const { taskId } = req.body;

    if (!taskId) {
      return response(res, { success: false }, "Required taskId", 400);
    }

    const taskRef = db.collection("task").doc(taskId);
    const taskSnap = await taskRef.get();
    if (!taskSnap.exists) {
      return response(res, { success: false }, "Task's not existed", 400);
    }

    await taskRef.delete();
    return response(res, { success: true }, "Successfully deleted task", 201);
  } catch (error) {
    errorHandler(error, "delete task");
    response(res, { success: false }, "Internal server error", 500);
  }
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
