// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");

// // router.get("/dashboard", adminController.getDashboard);
// // router.post("/add-player", adminController.addPlayer);
// // router.post("/cancel-membership/:id", adminController.cancelMembership);
// // router.get("/dashboard", adminController.getDashboard);
// // router.post("/add-player", adminController.addPlayer); // Add player route
// // router.post("/cancel-membership/:id", adminController.cancelMembership);

// // Route to get the admin dashboard
// router.get("/dashboard", adminController.getDashboard);

// // Route to render the add player form
// router.get("/add-player", adminController.getAddPlayer); // This line is crucial

// // Route to handle adding a new player
// router.post("/add-player", adminController.addPlayer);

// // Route to cancel a player's membership
// router.post("/cancel-membership/:id", adminController.cancelMembership);

// module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to get the admin dashboard
router.get("/dashboard", adminController.getDashboard);

// Route to render the add player form
router.get("/add-player", adminController.getAddPlayer); // Ensure this is correctly defined

// Route to handle adding a new player
router.post("/add-player", adminController.addPlayer);

// Routes for adding coaches
router.get("/add-coach", adminController.getAddCoach);
router.post("/add-coach", adminController.addCoach);

// Route to cancel a player's membership
router.post("/cancel-membership/:id", adminController.cancelMembership);

module.exports = router;
