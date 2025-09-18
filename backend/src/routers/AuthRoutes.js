const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");

router.post("/send/login-signup-otp", authController.sendLoginOtp);

module.exports = router;
