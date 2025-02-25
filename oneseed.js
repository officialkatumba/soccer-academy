const mongoose = require("mongoose");
const User = require("./models/User"); // Ensure this path is correct

// Directly using the connection string
const mongoURI =
  "mongodb+srv://officialkatumba:Katumba%402024@cluster0.lj1x5.mongodb.net/soccer-academy?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "plainpassword", // Make sure to hash this password in a real app
      role: "admin",
    });

    await testUser
      .save()
      .then(() => console.log("Test user saved"))
      .catch((err) => console.error("Error saving test user:", err))
      .finally(() => mongoose.connection.close());
  })
  .catch((err) => console.error("MongoDB connection error:", err));
