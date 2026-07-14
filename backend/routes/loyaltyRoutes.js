const express = require("express");
const router = express.Router();

const {
  getCustomerTransactions,
  addPoints,
  redeemReward
} = require("../controllers/loyaltyController");

router.get("/:id/transactions", getCustomerTransactions);
router.post("/add-points", addPoints);
router.post("/redeem", redeemReward);

module.exports = router;