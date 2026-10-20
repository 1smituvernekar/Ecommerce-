import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing. Please login again",
      });
    }

    const tokenDecode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded token:", tokenDecode);

    if (!tokenDecode.id) {
      return res.status(401).json({
        success: false,
        message: "User ID missing from token",
      });
    }

    req.userId = tokenDecode.id;

    console.log("Authenticated user ID:", req.userId);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;
