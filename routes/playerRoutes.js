const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/dashboard", playerController.getDashboard);
router.get("/performance", playerController.getPerformance);

module.exports = router;
