const AuthService = require("../service/AuthService");

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
    
}

module.exports = new AuthController();
