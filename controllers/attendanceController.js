const User = require("../models/User");
const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "your-email@gmail.com", pass: "your-email-password" },
});

async function sendExpiryNotification(player) {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: player.parentEmail,
    subject: "Membership Expired - Soccer Academy",
    text: `Dear ${player.parentName},\n\nYour child, ${player.name}, attempted to clock in, but their membership has expired. Please renew as soon as possible.\n\nThank you,\nSoccer Academy`,
  };
  await transporter.sendMail(mailOptions);
}

exports.clockIn = async (req, res) => {
  if (req.user.role !== "player") return res.status(403).send("Unauthorized");

  if (req.user.membershipStatus !== "active") {
    await sendExpiryNotification(req.user);
    return res.status(403).send("Membership expired. Renewal needed.");
  }

  req.user.clockInTimes.push(new Date());
  await req.user.save();

  res.redirect("/player/dashboard");
};

exports.clockOut = async (req, res) => {
  if (req.user.role !== "player") return res.status(403).send("Unauthorized");

  req.user.clockOutTimes.push(new Date());
  await req.user.save();

  res.redirect("/player/dashboard");
};
