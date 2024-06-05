const express = require("express");
const router = express.Router();
const {
  loginAccount,
  refreshToken,
} = require("../controllers/auth/loginAccount.controller");
const {
  createNewAccessCode,
  validateAccessCode,
} = require("../controllers/auth/loginNoPass.controller");

router.post("/login", loginAccount);
router.get("/refresh-token", refreshToken);
router.post("/send-verify-code", createNewAccessCode);
router.post("/validate-code", validateAccessCode);

module.exports = router;
