
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./Routes/productRoutes.js";
import userRouter from "./Routes/userRoutes.js"
import cartRouter from "./Routes/CartRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); 

// Database and Cloudinary
connectDb();
connectCloudinary();

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to your backend server!"
  });
});

// Product routes
app.use("/api/user",userRouter)
app.use("/api/product", productRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order", orderRouter);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});









