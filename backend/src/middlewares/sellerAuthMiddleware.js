const jwtProvider = require("../utill/jwtProvider");
const SellerService = require("../service/SellerService");
const sellerMiddleware = async(req, res, next ) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message: "Invalid token,authorization failed"});
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Token not found,authorization failed"});
        }
       let email= jwtProvider.getEmailFromJwt(token);
       const seller = await SellerService.getSellerByEmail(email);
       req.seller = seller;
       next();
    } catch (error) {
        return res.status(error instanceof Error ? 404 : 500).json({message: error.message});
    }
}
module.exports = sellerMiddleware;