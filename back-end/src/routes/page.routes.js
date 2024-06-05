const express = require("express");
const router = express.Router();
const VerifyToken = require("../middlewares/verifyToken");

const {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee/employee.controller");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task/task.controller");

router.post("/employee", VerifyToken, getEmployee);
router.post("/create-employee", VerifyToken, createEmployee);
router.post("/update-employee", VerifyToken, updateEmployee);
router.delete("/employee", VerifyToken, deleteEmployee);

router.post("/task", VerifyToken, getTask);
router.get("/task/:employeeId", VerifyToken, getTask);
router.post("/create-task", VerifyToken, createTask);
router.put("/update-task", VerifyToken, updateTask);
router.delete("/task", VerifyToken, deleteTask);

module.exports = router;
