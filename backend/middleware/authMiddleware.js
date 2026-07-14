const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const secret = process.env.JWT_SECRET || "ikafe-secret";
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId).select("username role email");
    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.user = { id: user._id, username: user.username, role: user.role, email: user.email };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: insufficient permissions" });
  }
  next();
};

module.exports = { authenticate, authorizeRoles };
