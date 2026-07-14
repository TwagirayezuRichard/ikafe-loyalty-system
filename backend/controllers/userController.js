const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { role, username, password, email } = req.body;
    if (!role || !username || !password) {
      return res.status(400).json({ message: "Role, username, and password are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const userCount = await User.countDocuments();
    const secret = process.env.JWT_SECRET || "ikafe-secret";

    if (userCount > 0) {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }

      try {
        const decoded = jwt.verify(token, secret);
        const authUser = await User.findById(decoded.userId);
        if (!authUser || authUser.role !== "admin") {
          return res.status(403).json({ message: "Admin access required" });
        }
      } catch (error) {
        return res.status(401).json({ message: "Invalid authentication token" });
      }
    } else if (role !== "admin") {
      return res.status(400).json({ message: "The first user must be an admin" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ role, username, password: hashedPassword, email });
    await user.save();

    res.status(201).json({ username: user.username, role: user.role, email: user.email, message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username role email createdAt").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const secret = process.env.JWT_SECRET || "ikafe-secret";
    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: "12h" });

    res.json({ token, username: user.username, role: user.role, email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error logging in" });
  }
};

module.exports = { createUser, getUsers, loginUser };
