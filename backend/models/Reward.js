const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: String,

  description: String,

  pointsRequired: Number,

  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Reward", rewardSchema);