const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");

router.get("/dashboard", coachController.getDashboard);
router.post("/add-performance/:id", coachController.addPerformance);
router.get("/player-report/:id", coachController.getPlayerReport);

module.exports = router;
