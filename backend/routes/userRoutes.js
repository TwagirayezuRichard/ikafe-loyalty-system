const express = require("express");
const router = express.Router();
const { createUser, getUsers, loginUser, updateUser, deleteUser } = require("../controllers/userController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", createUser);
router.get("/", authenticate, authorizeRoles("admin"), getUsers);
router.post("/login", loginUser);
router.put("/:id", authenticate, authorizeRoles("admin"), updateUser);
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteUser);

module.exports = router;
