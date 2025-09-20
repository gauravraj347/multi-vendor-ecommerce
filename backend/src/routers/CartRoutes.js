const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const CartController = require("../controller/cartController");

router.get("/", authMiddleware, CartController.findUserCartHandler);

router.put("/add", authMiddleware, CartController.addItemToCartHandler);

router.delete("/item/:cartItemId", authMiddleware, CartController.deleteCartItemHandler);

router.put("/item/:cartItemId", authMiddleware, CartController.updateCartItemHandler);

module.exports = router;
