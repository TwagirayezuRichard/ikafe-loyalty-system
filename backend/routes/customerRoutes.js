const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomer,
  getAllCustomers
} = require("../controllers/customerController");

router.post("/register", registerCustomer);
router.get("/:id", getCustomer);
router.get("/", getAllCustomers);

module.exports = router;