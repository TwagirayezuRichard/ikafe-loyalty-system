const Customer = require("../models/Customer");
const QRCode = require("qrcode");

exports.registerCustomer = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const existing = await Customer.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const count = await Customer.countDocuments();

    const customerId = `IKH-${String(count + 1).padStart(6, "0")}`;

    const qrCode = await QRCode.toDataURL(customerId);

    const customer = await Customer.create({
      customerId,
      name,
      phone,
      email
    });

    res.json({
      message: "Customer registered",
      customer,
      qrCode
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      customerId: req.params.id
    });

    res.json(customer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};