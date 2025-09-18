const SellerService = require("../service/SellerService");
const VerificationCode = require("../model/VerificationCode");
const sendVerificationEmail = require("../utill/sendEmail");
const generateOtp = require("../utill/generateOtp");


class AuthService {
    async sendLoginOtp(email){

        const   SIGNIN_PREFIX = "signin_";

        if(email.startsWith(SIGNIN_PREFIX)){
            email = email.substring(SIGNIN_PREFIX.length);
            const seller = await SellerService.getSellerByEmail(email);
        if(!seller){
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
}

module.exports = new AuthService();
