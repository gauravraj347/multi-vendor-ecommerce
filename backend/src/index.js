const express = require("express")
const connectDB = require("./db/db")
const adminRoutes = require("./routers/AdminRoutes")
const sellerRoutes = require("./routers/SellerRoutes")
const authRoutes = require("./routers/AuthRoutes")
const userRoutes = require("./routers/UserRoutes")
const productRoutes = require("./routers/ProductRoutes")
const sellerProductRoutes = require("./routers/SellerProductRoutes")
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
app.use("/api/users", userRoutes);
app.use("/sellers", sellerRoutes);

app.use("/products", productRoutes);
app.use("/api/sellers/products", sellerProductRoutes);

app.use("/admin", adminRoutes);








const PORT = process.env.PORT;


app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`)
    await connectDB();
})
