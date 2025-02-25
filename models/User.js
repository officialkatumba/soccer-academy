// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true }, // Add unique constraint
//   password: { type: String, required: true }, // Required password field
//   role: { type: String, enum: ["admin", "coach", "player"], required: true },
//   membershipCategory: {
//     type: String,
//     enum: ["3 months", "6 months", "1 year"],
//     default: "3 months",
//   },
//   membershipStatus: {
//     type: String,
//     enum: ["active", "expired", "pending"],
//     default: "active",
//   },
//   parentName: String,
//   parentEmail: String,
//   clockInTimes: [{ type: Date }], // Store clock-in times
//   clockOutTimes: [{ type: Date }], // Store clock-out times
// });

// // Method to compare passwords
// UserSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Hash password before saving
// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "coach", "player"], required: true },
  membershipCategory: {
    type: String,
    enum: ["3 months", "6 months", "1 year"],
    default: "3 months",
  },
  membershipStatus: {
    type: String,
    enum: ["active", "expired", "pending"],
    default: "active",
  },
  parentName: String,
  parentEmail: String,
  specialty: String, // New field for coach specialty
  clockInTimes: [{ type: Date }],
  clockOutTimes: [{ type: Date }],
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
