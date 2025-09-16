const express = require("express")
const connectDB = require("./db/db")

const dotenv = require("dotenv");

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Multivendor"
    })
})


const PORT = process.env.PORT;


app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`)
    await connectDB();
})
