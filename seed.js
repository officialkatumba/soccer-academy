const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Adjust the path if necessary

// Directly using the connection string
const mongoURI =
  "mongodb+srv://officialkatumba:Katumba%402024@cluster0.lj1x5.mongodb.net/soccer-academy?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash("password123", 10);

    const adminUser = new User({
      name: "Admin1",
      email: "admin1@greatacademy.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser
      .save()
      .then(() => console.log("Admin user saved"))
      .catch((err) => console.error("Error saving admin user:", err))
      .finally(() => mongoose.connection.close());
  })
  .catch((err) => console.error("MongoDB connection error:", err));
