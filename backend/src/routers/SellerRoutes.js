const express = require("express");
const router = express.Router();

const SellerController = require("../controller/sellerController");
const sellerMiddleware = require("../middlewares/sellerAuthMiddleware");



router.get("/profile",sellerMiddleware, SellerController.getSellerProfile);
router.post("/", SellerController.createSeller);
router.get("/", SellerController.getAllSeller);
router.patch("/", sellerMiddleware, SellerController.updateSeller);
// router.delete("/", SellerController.deleteSeller);
router.post("/verify/login-otp", SellerController.verifyLoginOtp);

module.exports = router;