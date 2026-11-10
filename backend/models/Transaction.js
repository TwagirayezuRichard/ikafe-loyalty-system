const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: String,

  amount: Number,

  amountPaid: Number,

  walletUsed: Number,

  cashbackEarned: Number,

  type: {
    type: String,
    enum: ["purchase", "wallet_redeem"],
    default: "purchase"
  },

  currency: {
    type: String,
    default: "RWF"
  },

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
