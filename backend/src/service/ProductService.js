const calculateDiscountPercentage = (mrpPrice, sellingPrice) => {
    if(mrpPrice < 0) {
       throw new Error("MRP price cannot be negative");
    }
   const discount = mrpPrice - sellingPrice;
   const discountPercentage = (discount / mrpPrice) * 100;
   return discountPercentage;
}

const Product = require("../model/Product");
const Category = require("../model/Category");

class ProductService {
    async createProduct(req, seller) {
        try {
            const discountPercentage = calculateDiscountPercentage(req.mrpPrice, req.sellingPrice);
            const category1=await this.createOrGetCategory(req.category,1);
            const category2=await this.createOrGetCategory(req.category2,2,category1._id);
            const category3=await this.createOrGetCategory(req.category3,3,category2._id);
            
            const product = new Product({
                title: req.title,
                description: req.description,
                mrpPrice: req.mrpPrice,
                sellingPrice: req.sellingPrice,
                discountPercentage,
                quantity: req.quantity,
                color: req.color,
                images: req.images,
                category: category3._id,
                seller:seller._id,
                size: req.size
            });
            return await product.save();
            
        } catch (error) {
            throw new Error(error.message);
        }

        
    }
    async createOrGetCategory(categoryId, level, parentId=null) {
        // Lookup by business key `categoryId` (string), not Mongo `_id`
        let category = await Category.findOne({ categoryId });
        if(!category) {
            category = new Category({
                categoryId,
                level,
                parentCategory: parentId,
            });
            category = await category.save();
        }
        return category;
      
    } 
    async deleteProduct(productId) {
       try {
           const product = await Product.findByIdAndDelete(productId);
           return "Product deleted successfully";
       } catch (error) {
           throw new Error(error.message);
       }
    }
    async updateProduct(productId, updateProductData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updateProductData, {
                new: true
            });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if(!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async searchProduct(query) {
        try {
            const products = await Product.find({
                title: new RegExp(query, "i")
            });
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getProductsBySeller(sellerId) {
       return await Product.find({seller:sellerId})
    }
    async getAllProducts(req) {
        const filterQuery={};
       if(req.category){
        const category=await Category.findOne({categoryId:req.category})
        if(!category){
            return {
                content:[],
                totalPages:0,
                totalElements:0
            }
        }
        filterQuery.category=category._id.toString();
       }
       if(req.color){
        filterQuery.color=req.color;
       }
       if(req.minPrice && req.maxPrice){
        filterQuery.sellingPrice={$gte:req.minPrice,$lte:req.maxPrice};
       }
       if(req.minDiscount){
        filterQuery.discountPercentage={$gte:req.minDiscount};
       }

       if(req.size){
        filterQuery.size=req.size;
       }
       let sortQuery={};
       if(req.sortBy ==="price_low"){
        sortQuery.sellingPrice=1;
       }
       if(req.sortBy ==="price_high"){
        sortQuery.sellingPrice=-1;
       }
       

       const products=await Product.find(filterQuery)
       .sort(sortQuery)
       .skip((req.pageNumber)*10)
       .limit(10);

       const totalElements = await Product.countDocuments(filterQuery);
       const totalPages=Math.ceil(totalElements/10);
       return {
           content:products,
           totalPages,
           totalElements
       }
    }
}
// Export the service instance and also expose the utility function for other services to consume
module.exports = new ProductService();
module.exports.calculateDiscountPercentage = calculateDiscountPercentage;
