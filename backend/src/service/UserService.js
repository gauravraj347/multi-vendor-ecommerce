const User = require("../model/User");
const jwtProvider = require("../utill/jwtProvider");

class UserService {
    async findUserProfileByJwt(jwt){
        const email = jwtProvider.getEmailFromJwt(jwt);
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email");
        }
        return user;
    }
    async findUserByEmail(email){
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with this email");
        }
        return user;
    }
}
module.exports = new UserService();
