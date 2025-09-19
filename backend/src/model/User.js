const UserRole = require("../domain/UserRole");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
         required: true
        },
    email: {
        type: String,
         required: true, 
         unique: true
        },
    password: {
        type: String, 
    },
    mobile: {
        type: String,
        
    },
    address: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
        },
    ],
    role: {
        type: String,
        enum: [UserRole.CUSTOMER, UserRole.ADMIN],
        default: UserRole.CUSTOMER
    }
});

module.exports = new mongoose.model("User", userSchema)