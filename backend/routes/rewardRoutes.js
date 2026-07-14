const express = require("express");
const router = express.Router();

const {
  createReward,
  getRewards
} = require("../controllers/rewardController");

router.post("/", createReward);
router.get("/", getRewards);

module.exports = router;