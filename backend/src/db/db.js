const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
