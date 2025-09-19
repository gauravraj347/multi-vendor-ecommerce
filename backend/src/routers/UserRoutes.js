const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile",authMiddleware, userController.getUserProfileByJwt);
module.exports = router;
