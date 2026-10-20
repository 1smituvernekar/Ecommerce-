
import jwt from "jsonwebtoken";
import user from "../Models/UserModels.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required",
      });
    }

    const exists = await user.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User exists already",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      success: true,
      message: "User successfully registered",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExists = await user.findOne({ email });

    if (!emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist. Try again",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      emailExists.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match. Try again",
      });
    }

    const token = jwt.sign(
      { id: emailExists._id },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADMIN LOGIN =================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      !password ||
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password",
      });
    }

    // Include email because adminAuth checks decoded.email
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  adminLogin,
};
