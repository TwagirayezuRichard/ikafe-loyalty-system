const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },

  name: { type: String, required: true },

  phone: { type: String, required: true, unique: true },

  email: String,

  points: { type: Number, default: 0 },

  totalSpent: { type: Number, default: 0 },

  visits: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", customerSchema);