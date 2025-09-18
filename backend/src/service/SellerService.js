const Seller = require("../model/Seller");
const Address = require("../model/Address");
const jwtProvider = require("../utill/jwtProvider");

class SellerService {
    // Register new seller
    async createSeller(sellerData) {
        const existingSeller = await Seller.findOne({ email: sellerData.email });
        if (existingSeller) {
            throw new Error("Email already registered");
        }

        // Save pickup address
        let savedAddress = null;
        if (sellerData.pickupAddress) {
            savedAddress = await Address.create(sellerData.pickupAddress);
        }

        // Create new seller
        const newSeller = new Seller({
           sellerName: sellerData.sellerName,
            email: sellerData.email,
            password: sellerData.password,
            mobile: sellerData.mobile,
            GSTIN: sellerData.GSTIN,
            bankDetails: sellerData.bankDetails,
            businessDetails: sellerData.businessDetails
        });
        

        return await newSeller.save();
    }

    // Fetch seller profile by JWT
    async getSellerProfile(jwt) {
        const email = jwtProvider.getEmailFromJwt(jwt);
        return this.getSellerByEmail(email);
    }

    // Fetch seller by email
    async getSellerByEmail(email) {
        // console.log("Email", email);
        const seller = await Seller.findOne({ email });
        if (!seller) {
            throw new Error("Seller not found");
        }
        return seller;
    }

    // Fetch seller by ID
    async getSellerById(id) {
        const seller = await Seller.findById(id);
        if (!seller) {
            throw new Error("Seller not found");
        }
        return seller;
    }

    // Get all sellers by status
   
    async getAllSeller(status) {
        return await Seller.find({accountStatus: status});
    }

    // Update seller details
    async updateSeller(existingSeller, sellerData) {
        return await Seller.findByIdAndUpdate(existingSeller._id, sellerData, {
            new: true,
        });
    }

    // Update seller account status
    async updateSellerStatus(existingSeller, status) {
        return await Seller.findByIdAndUpdate(
            existingSeller._id,
            { accountStatus: status },
            { new: true }
        );
    }

    // Delete seller
    async deleteSeller(existingSeller) {
        return await Seller.findByIdAndDelete(existingSeller._id);
    }

    // Delete seller pickup address
    async deleteSellerAddress(existingSeller) {
        return await Address.findByIdAndDelete(existingSeller.pickupAddress);
    }

}

module.exports = new SellerService();
