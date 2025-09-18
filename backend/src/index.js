const express = require("express")
const connectDB = require("./db/db")
const adminRoutes = require("./routers/AdminRoutes")
const sellerRoutes = require("./routers/SellerRoutes")
const authRoutes = require("./routers/AuthRoutes")
const bodyParser = require("body-parser")

const dotenv = require("dotenv");

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Multivendor"
    })
})

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/sellers", sellerRoutes);
app.use("/admin", adminRoutes);






const PORT = process.env.PORT;


app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`)
    await connectDB();
})
