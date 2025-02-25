const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: ["3 months", "6 months", "1 year"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "pending"],
    default: "pending",
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Membership", MembershipSchema);
