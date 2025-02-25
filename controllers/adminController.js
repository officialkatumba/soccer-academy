// const User = require("../models/User");

// exports.getDashboard = async (req, res) => {
//   try {
//     // Fetch players and coaches separately
//     const players = await User.find({ role: "player" });
//     const coaches = await User.find({ role: "coach" }); // Fetch coaches

//     res.render("admin/dashboard", { user: req.user, players, coaches }); // Pass coaches
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     res.redirect("/admin/dashboard"); // Handle errors as needed
//   }
// };

// // Render Add Player Form
// exports.getAddPlayer = (req, res) => {
//   res.render("admin/add-player", { user: req.user });
// };

// // Add a New Player

// const bcrypt = require("bcrypt");

// exports.addPlayer = async (req, res) => {
//   const { name, email, password, membershipCategory, parentName, parentEmail } =
//     req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password || "default123", 10); // Hash password

//     const newPlayer = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: "player",
//       membershipCategory,
//       parentName,
//       parentEmail,
//       membershipStatus: "active",
//     });

//     await newPlayer.save();
//     res.redirect("/admin/dashboard");
//   } catch (error) {
//     console.error("Error adding player:", error);
//     res.redirect("/admin/dashboard");
//   }
// };

// // Cancel Player Membership
// exports.cancelMembership = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, {
//       membershipStatus: "canceled",
//     });
//     res.redirect("/admin/dashboard");
//   } catch (error) {
//     console.error("Error canceling membership:", error);
//     res.redirect("/admin/dashboard");
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcrypt");

// Render Admin Dashboard with Players & Coaches
exports.getDashboard = async (req, res) => {
  try {
    const players = await User.find({ role: "player" });
    const coaches = await User.find({ role: "coach" });

    res.render("admin/dashboard", { user: req.user, players, coaches });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.redirect("/admin/dashboard");
  }
};

// Render Add Player Form
exports.getAddPlayer = (req, res) => {
  res.render("admin/add-player", { user: req.user });
};

// Add a New Player
exports.addPlayer = async (req, res) => {
  const { name, email, password, membershipCategory, parentName, parentEmail } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password || "default123", 10);

    const newPlayer = new User({
      name,
      email,
      password: hashedPassword,
      role: "player",
      membershipCategory,
      parentName,
      parentEmail,
      membershipStatus: "active",
    });

    await newPlayer.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error adding player:", error);
    res.redirect("/admin/dashboard");
  }
};

// Render Add Coach Form
exports.getAddCoach = (req, res) => {
  res.render("admin/add-coach", { user: req.user });
};

// Add a New Coach
exports.addCoach = async (req, res) => {
  const { name, email, password, specialty } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password || "default123", 10);

    const newCoach = new User({
      name,
      email,
      password: hashedPassword,
      role: "coach",
      specialty, // This needs to be added to the schema if not already there
    });

    await newCoach.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error adding coach:", error);
    res.redirect("/admin/dashboard");
  }
};

// Cancel Player Membership
exports.cancelMembership = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      membershipStatus: "canceled",
    });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error canceling membership:", error);
    res.redirect("/admin/dashboard");
  }
};
