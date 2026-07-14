const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");

exports.getCustomerTransactions = async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerId: req.params.id });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const transactions = await Transaction.find({ customerId: req.params.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add points after purchase
exports.addPoints = async (req, res) => {
  try {
    const { customerId, amount } = req.body;

    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const points = Math.floor(amount / 1000) * 10;

    customer.points += points;
    customer.totalSpent += amount;
    customer.visits += 1;

    await customer.save();

    await Transaction.create({
      customerId,
      amount,
      pointsEarned: points
    });

    res.json({
      message: "Points added",
      pointsEarned: points,
      totalPoints: customer.points
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Redeem reward
exports.redeemReward = async (req, res) => {
  try {
    const { customerId, pointsRequired } = req.body;

    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.points < pointsRequired) {
      return res.status(400).json({ message: "Not enough points" });
    }

    customer.points -= pointsRequired;

    await customer.save();

    await Transaction.create({
      customerId,
      amount: 0,
      pointsEarned: -pointsRequired,
      type: "redeem"
    });

    res.json({
      message: "Reward redeemed",
      remainingPoints: customer.points
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};