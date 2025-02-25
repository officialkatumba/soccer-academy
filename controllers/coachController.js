const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  const players = await User.find({ assignedCoach: req.user._id });
  res.render("coach/dashboard", { user: req.user, players });
};

exports.addPerformance = async (req, res) => {
  const { score, comments } = req.body;
  await User.findByIdAndUpdate(req.params.id, {
    $push: { performance: { score, comments, date: new Date() } },
  });
  res.redirect("/coach/dashboard");
};

exports.getPlayerReport = async (req, res) => {
  const player = await User.findById(req.params.id);
  res.render("coach/player-report", { user: req.user, player });
};
