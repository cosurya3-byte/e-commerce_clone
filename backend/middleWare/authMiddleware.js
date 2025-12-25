import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Get token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // 2. Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid or expired token." });
      }

      // 3. Attach user info to the request for use in controllers
      req.user = decoded;
      next(); // Move to the actual route handler
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
