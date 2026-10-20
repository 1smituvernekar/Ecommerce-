
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  cartData: {
    type: Object,
    default: {},
  },
});

const user =
  mongoose.models.user || mongoose.model("user", userSchema);

export default user;
