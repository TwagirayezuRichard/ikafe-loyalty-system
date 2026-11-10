const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomer,
  getAllCustomers
} = require("../controllers/customerController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/register", registerCustomer);
router.get("/", authenticate, authorizeRoles("staff", "admin"), getAllCustomers);
router.get("/:id", getCustomer);

module.exports = router;