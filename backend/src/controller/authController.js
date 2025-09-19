const AuthService = require("../service/AuthService");
const UserRoles = require("../domain/UserRole");

class AuthController {
    async sendLoginOtp(req, res){
        try {
            const email = req.body.email;
            await AuthService.sendLoginOtp(email);
        
            res.status(200).json({message: "OTP sent successfully"});
            
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }
    async createUser(req, res){
        try {
            const jwt = await AuthService.createUser(req.body);
           const authRes={
            jwt,
            message:"User created successfully",
            role:UserRoles.CUSTOMER
           }
           return res.status(200).json(authRes);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }
    async sigin(req, res){
        try {
            const authRes = await AuthService.sigin(req.body);
           
           return res.status(200).json(authRes);
        } catch (error) {
            res.status(error instanceof Error ? 404 : 500).json({
                message: error.message
            });
        }
    }
    
    
}

module.exports = new AuthController();
