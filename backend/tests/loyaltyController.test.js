const test = require('node:test');
const assert = require('node:assert/strict');

const { processPurchase } = require('../controllers/loyaltyController');
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');

test('processPurchase should honor useWallet=false and avoid wallet reduction', async () => {
  const customer = {
    customerId: 'IKH-000001',
    visits: 1,
    currentLevel: 1,
    totalSpent: 0,
    walletBalance: 1000,
    async save() {
      this.visits = this.visits + 1;
      this.currentLevel = 2;
    }
  };

  Customer.findOne = async () => customer;
  Transaction.create = async (payload) => payload;

  const req = {
    body: {
      customerId: 'IKH-000001',
      amount: 1000,
      useWallet: false
    }
  };

  const res = {
    json(payload) {
      assert.equal(payload.walletUsed, 0);
      assert.equal(payload.amountPaid, 1000);
      assert.equal(payload.walletBalance, 1010);
    },
    status(code) {
      return { json: () => {} };
    }
  };

  await processPurchase(req, res);
});
