import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // Ensure an admin user exists
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();
      console.log("Default admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

export default connectToDatabase;
