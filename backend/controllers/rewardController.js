const Reward = require("../models/Reward");

exports.createReward = async (req, res) => {
  try {
    const reward = await Reward.create(req.body);
    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ available: true });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};