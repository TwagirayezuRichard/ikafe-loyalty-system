const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");

const LEVEL_RULES = [
  { level: 1, maxVisits: 5, cashbackRate: 1 },
  { level: 2, maxVisits: 15, cashbackRate: 2 },
  { level: 3, maxVisits: 25, cashbackRate: 3 },
  { level: 4, maxVisits: 35, cashbackRate: 4 },
  { level: 5, maxVisits: Infinity, cashbackRate: 5 }
];

const getCustomerLevel = (visits) => {
  const levelRule = LEVEL_RULES.find((rule) => visits <= rule.maxVisits);
  return levelRule ? levelRule.level : 5;
};

const getCashbackRate = (level) => {
  const levelRule = LEVEL_RULES.find((rule) => rule.level === level);
  return levelRule ? levelRule.cashbackRate : 5;
};

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

exports.processPurchase = async (req, res) => {
  try {
    const { customerId, amount, useWallet = true } = req.body;

    const billAmount = Number(amount);

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    if (!Number.isFinite(billAmount) || billAmount <= 0) {
      return res.status(400).json({ message: "Bill amount must be a positive number in RWF" });
    }

    const customer = await Customer.findOne({ customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const currentVisits = Number(customer.visits || 0) + 1;
    const currentLevel = getCustomerLevel(currentVisits);
    const cashbackRate = getCashbackRate(currentLevel);
    const cashbackEarned = Math.round(billAmount * (cashbackRate / 100));
    const applyWallet = useWallet !== false;
    const walletUsed = applyWallet ? Math.min(Number(customer.walletBalance || 0), billAmount) : 0;
    const amountPaid = Math.max(0, billAmount - walletUsed);

    customer.visits = currentVisits;
    customer.currentLevel = currentLevel;
    customer.totalSpent = Number(customer.totalSpent || 0) + billAmount;
    customer.walletBalance = Math.max(0, Number(customer.walletBalance || 0) + cashbackEarned - walletUsed);

    await customer.save();

    const transaction = await Transaction.create({
      customerId,
      amount: billAmount,
      amountPaid,
      walletUsed,
      cashbackEarned,
      type: "purchase",
      currency: "RWF"
    });

    res.json({
      message: "Purchase processed with cashback",
      customerId: customer.customerId,
      customerLevel: customer.currentLevel,
      cashbackRate,
      cashbackEarned,
      walletUsed,
      amountPaid,
      walletBalance: customer.walletBalance,
      totalSpent: customer.totalSpent,
      visits: customer.visits,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPoints = async (req, res) => {
  return exports.processPurchase(req, res);
};