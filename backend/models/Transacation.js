const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: String,

  amount: Number,

  pointsEarned: Number,

  type: {
    type: String,
    enum: ["purchase", "redeem"],
    default: "purchase"
  },

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);