const { default: mongoose } = require("mongoose");
const UserRole = require("../domain/UserRole");

const sellerSchema= new mongoose.Schema({
    sellName:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    businessDetails:{
        businessName:{
            type:String,
        },
        businessEmail:{
            type:String,
        },
        businessAddress:{
            type:String,
        }
    },
    bankDetails:{
        accountNumber:{
            type:String,
        },
        accountHolderName:{
            type:String,
        },
        bankName:{
            type:String,
        },
        ifscCode:{
            type:String
        }
    },
    pickupAddress:{
        type:mongoose.Schema.ObjectId,
        ref:"Adress"
    },
    GSTIN:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:[UserRole.SELLER],
        default:UserRole.SELLER
    },
    accountStatus:{
        type:String,
        enum:[],
        default:false
    }
})

module.exports = mongoose.model("Seller",sellerSchema)