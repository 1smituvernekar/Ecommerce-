import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      required: true
    },
    razorpayOrderId: {
  type: String,
  default: "",
},

razorpayPaymentId: {
  type: String,
  default: "",
},

    amount: {
      type: Number,
      required: true
    },

    address: {
      type: Object,
      required: true
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'RAZORPAY']
    },

    payment: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      default: 'Order Placed'
    }
  },
  { 
    timestamps: true
  }
)

const OrderModel =
  mongoose.models.Order ||
  mongoose.model('Order', orderSchema)

export default OrderModel