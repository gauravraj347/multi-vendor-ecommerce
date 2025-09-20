const CartItem = require("../model/CartItem");

class CartItemService {
    async removeCartItem(userId,cartItemId){
    
            const cartItem = await this.findCartItemById(cartItemId);
           if(cartItem.usrId.toString()===userId.toString()){
            await cartItem.deleteOne();
            return "Cart item removed successfully";
            
           }else{
            throw new Error("You are not authorized to remove this cart item");
           }
    }
   


    async updateCartItem(userId,cartItemId, cartItemData){
    
        const cartItem = await this.findCartItemById(cartItemId);
       if(cartItem.usrId.toString()===userId.toString()){
       
        const updated={
            quantity:cartItemData.quantity,
            mrpPrice:cartItemData.quantity*cartItem.product.mrpPrice,
            sellingPrice:cartItemData.quantity*cartItem.product.sellingPrice
        }
        return await CartItem.findByIdAndUpdate(cartItemId,updated,{new:true}).populate("product");
        
        
       }else{
        throw new Error("You are not authorized to remove this cart item");
       }
    }
    async findCartItemById(cartItemId){
        const cartItem = await CartItem.findById(cartItemId).populate("product");
        if(!cartItem){
            throw new Error("Cart item not found");
        }
        return cartItem;
    }
}
module.exports = new CartItemService();
    
    
    
