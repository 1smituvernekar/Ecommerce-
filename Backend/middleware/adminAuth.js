import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please login again.",
      });
    } 
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.email?.trim().toLowerCase() !==
      process.env.ADMIN_EMAIL?.trim().toLowerCase()
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized as admin.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default adminAuth;