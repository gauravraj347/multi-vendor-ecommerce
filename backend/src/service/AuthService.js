const SellerService = require("../service/SellerService");
const VerificationCode = require("../model/VerificationCode");
const sendVerificationEmail = require("../utill/sendEmail");
const generateOtp = require("../utill/generateOtp");
const Cart = require("../model/Cart");
const User = require("../model/User");
const Seller = require("../model/Seller");
const UserRoles = require("../domain/UserRole");
const bcrypt = require("bcrypt");
const jwtProvider = require("../utill/jwtProvider");
const userServce = require("../service/UserService");

class AuthService {
    async sendLoginOtp(email){

        const   SIGNIN_PREFIX = "signin_";

        if(email.startsWith(SIGNIN_PREFIX)){
            email = email.substring(SIGNIN_PREFIX.length);
            const seller = await Seller.findOne({email});
            const user = await User.findOne({ email });
            if(!seller && !user){
                throw new Error("User not found");
            }
            
        }
        
        const existingVerification = await VerificationCode.findOne({email});
        if(existingVerification){
            await VerificationCode.deleteOne({email});
        }
        const otp = generateOtp();
        console.log("otp", otp);
        const verificationCode = new  VerificationCode({ email, code: otp });
        await verificationCode.save();
        
        const subject = "Multi-vendor Login/Signup OTP";
        const  body  = `Your verification code is ${otp}. Please enter it to completer your login process`;
        await sendVerificationEmail(email, subject, body);
    }
    async createUser(req){
        const {email, fullName, otp} = req;
        let user = await User.findOne({email});
        if(user){
            throw new Error("User already exists");
        }
        const verificationCode = await VerificationCode.findOne({email});
        if(!verificationCode){
            throw new Error("Verification code not found");
        }
        if(verificationCode.code !== otp){
            throw new Error("Invalid verification code");
        }
        user = new User({
            email,
            fullName,
            role:UserRoles.CUSTOMER
        })
        await user.save();
        // return user;
        const cart = new Cart({
            user:user._id
        })
        await cart.save();

        return jwtProvider.createJwt({ email });
    }
    async sigin(req){
        const {email,otp} = req;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found");
        }
        const verificationCode = await VerificationCode.findOne({email});
        if(!verificationCode){
            throw new Error("Verification code not found");
        }
        if(verificationCode.code !== otp){
            throw new Error("Invalid verification code");
        }
        return {
            message:"User logged in successfully",
            jwt:jwtProvider.createJwt({email}),
            role:user.role
        }
    }
}

module.exports = new AuthService();
