const ProductService = require("../service/ProductService");
// const Product = require("../model/Product");
// const Seller = require("../model/Seller");

class SellerProductController {
    async getProductBySellerId(req,res){
        try {
            const seller=await req.seller;
            const product = await ProductService.getProductsBySeller(seller._id);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    async createProduct(req,res){
        try {
            const seller=await req.seller;

            const product = await ProductService.createProduct(req.body,seller);
            res.status(200).json(product)
        } catch (error) {
             res.status(500).json({error:error.message})
        }
    }

    async deleteProduct(req,res){
        try {
            await ProductService.deleteProduct(req.params.productId);
            return res.status(200).json({message:"Product deleted successfully"})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    async updateProduct(req,res){
        try {
            const product = await ProductService.updateProduct(req.params.productId, req.body);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    async getProductById(req,res){
        try {
            const product = await ProductService.findProductById(req.params.productId);
            return res.status(200).json(product)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    async searchProduct(req,res){
        try {
            const query=req.query.q;
            
            const product = await ProductService.searchProduct(query);
            return res.status(200).json(product)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
    async getAllProducts(req,res){
        try {
            const products = await ProductService.getAllProducts(req.query);
            return res.status(200).json(products)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}
module.exports = new SellerProductController();