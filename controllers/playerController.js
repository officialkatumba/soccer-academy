exports.getDashboard = (req, res) => {
  res.render("player/dashboard", { user: req.user });
};

exports.getPerformance = (req, res) => {
  res.render("player/performance", {
    user: req.user,
    performance: req.user.performance,
  });
};
