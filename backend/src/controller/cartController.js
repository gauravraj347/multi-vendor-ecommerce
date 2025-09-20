const ProductService = require("../service/ProductService");
const CartItemService = require("../service/CartItemService");
const CartService = require("../service/CartService");
class CartController{
    async findUserCartHandler(req,res){
        
    try{
        const user = await req.user;
        const cart = await CartService.findUserCart(user);
        res.status(200).json(cart);
        
    }catch(error){
        res.status(500).json({message:error.message});
    }

    }
    async addItemToCartHandler (req,res){
        try{
            const user = await req.user;
            const product = await ProductService.findProductById(req.body.productId);
            const cartItem = await CartService.addCartItem(user,product,req.body.size,req.body.quantity);
            res.status(200).json(cartItem);
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }
    async deleteCartItemHandler(req,res){
        try{
            const user = await req.user;
            const message = await CartItemService.removeCartItem(user.id,req.params.cartItemId);
            res.status(200).json({ message });
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }
    async updateCartItemHandler(req,res){
        try{
            const user = await req.user;
            const cartItemId = req.params.cartItemId;
            const { quantity } = req.body;
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be greater than 0" });
            }
            const updatedCartItem = await CartItemService.updateCartItem(user.id, cartItemId, { quantity });
            res.status(200).json(updatedCartItem);
        }catch(error){
            res.status(500).json({message:error.message});
        }
    }

}
module.exports = new CartController();


