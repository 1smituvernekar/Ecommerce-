import express from "express";

import {
  placeOrderCod,
  placeOrderRazorpay,
  verifyRazorpay,
  getUserOrders,
  getAllOrders,
} from "../Controllers/OrderControllers.js";

import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/cod", authUser, placeOrderCod);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

// Get logged-in user's orders
orderRouter.get("/userorders", authUser, getUserOrders);

//orderstatus


// Admin route
orderRouter.post("/list", authAdmin, getAllOrders);

export default orderRouter;