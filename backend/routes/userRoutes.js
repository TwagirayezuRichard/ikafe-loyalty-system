const express = require("express");
const router = express.Router();
const { createUser, getUsers, loginUser } = require("../controllers/userController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.get("/", authenticate, authorizeRoles("admin"), getUsers);
router.post("/login", loginUser);

module.exports = router;
