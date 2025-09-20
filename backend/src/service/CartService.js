const Cart = require("../model/Cart");
const CartItem = require("../model/CartItem");
const { calculateDiscountPercentage } = require("./ProductService");

class CartService {

  async findUserCart(user) {
    const cart = await Cart.findOne({ user: user.id });
    if (!cart) return null;

    // Load items and compute totals
    const cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    let totalMrp = 0;
    let totalSelling = 0;
    let totalItems = 0;

    cartItems.forEach((ci) => {
      totalMrp += ci.mrpPrice;
      totalSelling += ci.sellingPrice;
      totalItems += ci.quantity || 1;
    });

    cart.cartItems = cartItems;
    cart.totalMrpPrice = totalMrp;
    cart.totalSellingPrice = totalSelling;
    cart.totalItem = totalItems;
    cart.discount = totalMrp > 0 ? calculateDiscountPercentage(totalMrp, totalSelling) : 0;

    return cart;
  }

  async addCartItem(user, product, size, quantity) {
    const cart = await Cart.findOne({ user: user.id });
    if (!cart) throw new Error("Cart not found for user");

    let existing = await CartItem.findOne({ cart: cart._id, product: product._id, size }).populate("product");

    if (existing) {
      // Update quantity and prices
      const newQty = (existing.quantity || 1) + (quantity || 1);
      existing.quantity = newQty;
      existing.mrpPrice = newQty * product.mrpPrice;
      existing.sellingPrice = newQty * product.sellingPrice;
      await existing.save();
      return existing;
    }

    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      size,
      quantity,
      mrpPrice: quantity * product.mrpPrice,
      sellingPrice: quantity * product.sellingPrice,
      usrId: user.id,
    });
    await cartItem.save();
    return cartItem;
  }
}

module.exports = new CartService();
