
const SellerService = require("../service/SellerService");
const VerificationCode = require("../model/VerificationCode");
const jwtProvider = require("../utill/jwtProvider");
const UserRole = require("../domain/UserRole");

class SellerController {
    // Get seller profile by JWT
    async getSellerProfile(req, res) {
        try {
            const profile= await    req.seller;
            console.log("Profile", profile);
            const jwt = req.headers.authorization.split(" ")[1];
            const seller = await SellerService.getSellerProfile(jwt);
            res.status(200).json(seller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        } 
    }

    // Create new seller
    async createSeller(req, res) {
        try {
            const seller = await SellerService.createSeller(req.body);
            res.status(201).json({ message: "Seller successfully created" });
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }

    // Get all sellers (optionally by status)
    async getAllSeller(req, res) {
        try {
            const status = req.query.status;
            const seller = await SellerService.getAllSeller(status);
            res.status(200).json(seller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }

    // Update seller details
    async updateSeller(req, res) {
        try {
            const existingSeller = req.seller;
            const seller = await SellerService.updateSeller(existingSeller, req.body);
            res.status(200).json(seller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }

    // Delete seller by ID
    async deleteSeller(req, res) {
        try {
            await SellerService.deleteSeller(req.params.id);
            res.status(200).json({ message: "Seller successfully deleted" });
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }

    // Update seller account status
    async updateSellerAccountStatus(req, res) {
        try {
            const updatedSeller = await SellerService.updateSellerStatus(
                req.params.id,
                req.body.status
            );
            res.status(200).json(updatedSeller);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }

    // Verify seller login OTP
    async verifyLoginOtp(req, res) {
        try {
            const { otp, email } = req.body;
            const seller = await SellerService.getSellerByEmail(email);
            // if (!seller) {
            //     throw new Error("Seller not found");
            // }
            const verificationCode = await VerificationCode.findOne({ email });
            if(!verificationCode || verificationCode.code !=otp){
                throw new Error("Invalid OTP");
            }
            const token = jwtProvider.createJwt({ email });
            const authResponse = {
                message: "Login successfully",
                jwt:token,
                role:UserRole.SELLER
            }
            return res.status(200).json({authResponse});
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }
}

module.exports = new SellerController();
