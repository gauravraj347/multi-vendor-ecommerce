const mongoose = require("mongoose");
const verificationCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    code: {
        type: String,
    }

});

const VerificationCode = mongoose.model("VerificationCode", verificationCodeSchema);
module.exports = VerificationCode;