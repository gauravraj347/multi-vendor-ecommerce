const express = require("express");
const router = express.Router();
const sellerController = require("../controller/sellerController");

router.patch("/seller/:id/status/:status", sellerController.updateSellerAccountStatus);

module.exports = router;