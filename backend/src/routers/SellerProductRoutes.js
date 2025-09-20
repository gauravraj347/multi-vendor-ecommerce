const express = require("express");
const  router = express.Router();
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware");
const SellerProductController = require("../controller/productController");

router.get("/", sellerAuthMiddleware, SellerProductController.getProductBySellerId);

router.post("/", sellerAuthMiddleware, SellerProductController.createProduct);

router.delete("/:productId", sellerAuthMiddleware, SellerProductController.deleteProduct);

router.put("/:productId", sellerAuthMiddleware, SellerProductController.updateProduct);

module.exports = router;