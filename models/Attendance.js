const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clockInTime: Date,
  clockOutTime: Date,
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
