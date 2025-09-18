

const {default: mongoose} = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: {
        type: String
    },
    locality:{
        type: String,
    },
    pincode:{
        type: String,
    },
    state:{
        type: String,
    },
    address:{
        type: String,
    },
    mobile:{
        type: String,
    },
    
}, {
    timestamps: true
})


module.exports = mongoose.model("Address", addressSchema);
