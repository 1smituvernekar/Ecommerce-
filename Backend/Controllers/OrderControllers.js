
import OrderModel from "../Models/OrderModels.js";
import UserModel from "../Models/UserModels.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "node:crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. CASH ON DELIVERY 
const placeOrderCod = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const order = await OrderModel.create({
      userId: req.userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
    });

    await UserModel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "COD order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. CREATE RAZORPAY ORDER
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const order = await OrderModel.create({
      userId: req.userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "RAZORPAY",
      payment: false,
      status: "Payment Pending",
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: String(order._id),
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      success: true,
      message: "Razorpay order created",
      razorpayOrder,
      orderId: order._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. VERIFY RAZORPAY PAYMENT
const verifyRazorpay = async (req, res) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !orderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    const order = await OrderModel.findOne({
      _id: orderId,
      userId: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Order ID does not match",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const received = Buffer.from(razorpay_signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");

    if (
      received.length !== expected.length ||
      !crypto.timingSafeEqual(received, expected)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Mark order as paid
    order.payment = true;
    order.status = "Order Placed";
    order.razorpayPaymentId = razorpay_payment_id;

    await order.save();

    // Clear cart after successful verification
    await UserModel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. GET LOGGED-IN USER'S ORDERS
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. GET ALL ORDERS FOR ADMIN
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({}).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//orderstatus


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const allowedStatuses = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.json({
      success: true,
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export {
  placeOrderCod,
  placeOrderRazorpay,
  verifyRazorpay,
  getUserOrders,
  getAllOrders,
};
