// require("dotenv").config();
// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");
// const mongoose = require("mongoose");
// const User = require("./models/User");

// // Import route files
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const coachRoutes = require("./routes/coachRoutes");
// const playerRoutes = require("./routes/playerRoutes");
// const attendanceRoutes = require("./routes/attendanceRoutes");

// const app = express();
// app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.use(express.static("public"));

// app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB
// // mongoose.connect("mongodb://127.0.0.1:27017/soccer-academy", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // });

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Middleware for checking authentication
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }

// // Home Route
// app.get("/", (req, res) => {
//   res.render("index", { user: req.user });
// });

// // Routes
// app.use("/", authRoutes); // Authentication (login, logout)
// app.use("/admin", adminRoutes); // Admin actions (manage users, memberships)
// app.use("/coach", coachRoutes); // Coach actions (track players, reports)
// app.use("/player", playerRoutes); // Player actions (dashboard, view performance)
// app.use("/attendance", attendanceRoutes); // Clock-in/out system

// // Start Server
// app.listen(3000, () => console.log("Server running on port 3000"));
// require("dotenv").config();
// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");
// const mongoose = require("mongoose");
// const User = require("./models/User");

// // Import route files
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const coachRoutes = require("./routes/coachRoutes");
// const playerRoutes = require("./routes/playerRoutes");
// const attendanceRoutes = require("./routes/attendanceRoutes");

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.use(express.static("public"));

// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Middleware for checking authentication
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/login");
// }

// // Home Route
// app.get("/", (req, res) => {
//   res.render("index", { user: req.user });
// });

// // Routes
// app.use("/", authRoutes); // Authentication (login, logout)
// app.use("/admin", isAuthenticated, adminRoutes); // Admin actions (manage users, memberships)
// app.use("/coach", isAuthenticated, coachRoutes); // Coach actions (track players, reports)
// app.use("/player", isAuthenticated, playerRoutes); // Player actions (dashboard, view performance)
// app.use("/attendance", isAuthenticated, attendanceRoutes); // Clock-in/out system

// // Start Server
// app.listen(3000, () => console.log("Server running on port 3000"));

require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy; // Import the local strategy

// Import route files
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const coachRoutes = require("./routes/coachRoutes");
const playerRoutes = require("./routes/playerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy for Passport
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Change this to match your login form field
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }); // Adjust the query according to your User model
        if (!user) {
          return done(null, false); // No user found
        }
        const isMatch = await user.comparePassword(password); // Ensure you have a method to compare passwords
        if (!isMatch) {
          return done(null, false); // Password does not match
        }
        return done(null, user); // User authenticated
      } catch (error) {
        return done(error); // Handle errors
      }
    }
  )
);

// Serialize and deserialize user instances to and from the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for checking authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Home Route
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

// Routes
app.use("/", authRoutes); // Authentication (login, logout)
app.use("/admin", adminRoutes); // Admin actions (manage users, memberships)
app.use("/coach", coachRoutes); // Coach actions (track players, reports)
app.use("/player", playerRoutes); // Player actions (dashboard, view performance)
app.use("/attendance", attendanceRoutes); // Clock-in/out system

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));
