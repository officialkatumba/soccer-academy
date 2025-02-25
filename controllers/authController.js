// const passport = require("passport");

// exports.getLogin = (req, res) => {
//   res.render("auth/login", { user: req.user });
// };

// exports.postLogin = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err); // Handle errors
//     }
//     if (!user) {
//       return res.redirect("/login"); // Redirect to login if no user found
//     }

//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err); // Handle errors during login
//       }

//       // Redirect based on user role
//       if (user.role === "admin") {
//         return res.redirect("/admin/dashboard");
//       } else if (user.role === "coach") {
//         return res.redirect("/coach/dashboard");
//       } else if (user.role === "player") {
//         return res.redirect("/player/dashboard");
//       } else {
//         return res.redirect("/"); // Default redirect if role not recognized
//       }
//     });
//   })(req, res, next);
// };

// exports.logout = (req, res) => {
//   req.logout((err) => {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// };

const passport = require("passport");

// Render Login Page
exports.getLogin = (req, res) => {
  res.render("auth/login", { user: req.user });
};

// Handle User Login
exports.postLogin = (req, res, next) => {
  console.log("🔍 Login attempt with email:", req.body.email);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("❌ Passport authentication error:", err);
      return next(err); // Pass error to Express error handler
    }
    if (!user) {
      console.warn("❌ Authentication failed:", info);
      return res.redirect("/login"); // Redirect if authentication fails
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("❌ Login session error:", err);
        return next(err);
      }

      console.log("✅ Login successful:", user.email, "Role:", user.role);

      // Redirect user based on role
      switch (user.role) {
        case "admin":
          return res.redirect("/admin/dashboard");
        case "coach":
          return res.redirect("/coach/dashboard");
        case "player":
          return res.redirect("/player/dashboard");
        default:
          console.warn("⚠️ Unrecognized role:", user.role);
          return res.redirect("/");
      }
    });
  })(req, res, next);
};

// Handle Logout
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("❌ Logout error:", err);
      return next(err);
    }
    console.log("✅ User logged out successfully");
    res.redirect("/");
  });
};
