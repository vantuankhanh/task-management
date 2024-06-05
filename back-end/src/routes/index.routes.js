const express = require("express");
const router = express.Router();
const VerifyToken = require("../middlewares/verifyToken");

const {
  loginAccount,
  refreshToken,
} = require("../controllers/auth/loginAccount.controller");
const {
  createNewAccessCode,
  validateAccessCode,
} = require("../controllers/auth/loginNoPass.controller");
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

// ROUTES
// Home
router.get("/", (req, res) => {
  res.send("<h1>HOME PAGE</h1>");
});

// Auth
router.post("/api/auth/login", loginAccount);
router.get("/api/auth/refresh-token", refreshToken);
router.post("/api/auth/send-verify-code", createNewAccessCode);
router.post("/api/auth/validate-code", validateAccessCode);

// Employee
router.post("/api/employee", VerifyToken, getEmployee);
router.post("/api/create-employee", VerifyToken, createEmployee);
router.post("/api/update-employee", VerifyToken, updateEmployee);
router.delete("/api/employee", VerifyToken, deleteEmployee);

// Task
router.post("/api/task", VerifyToken, getTask);
router.get("/api/task/:employeeId", VerifyToken, getTask);
router.post("/api/create-task", VerifyToken, createTask);
router.put("/api/update-task", VerifyToken, updateTask);
router.delete("/api/task", VerifyToken, deleteTask);

module.exports = router;
