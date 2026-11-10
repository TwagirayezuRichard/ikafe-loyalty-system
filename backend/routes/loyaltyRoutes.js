const express = require("express");
const router = express.Router();

const {
  getCustomerTransactions,
  processPurchase,
  addPoints
} = require("../controllers/loyaltyController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/:id/transactions", getCustomerTransactions);
router.post("/process-purchase", authenticate, authorizeRoles("staff", "admin"), processPurchase);
router.post("/add-points", authenticate, authorizeRoles("staff", "admin"), addPoints);

module.exports = router;