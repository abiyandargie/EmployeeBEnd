import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js"; // Adjust the path if needed

export const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const createAdminUserIfNeeded = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("No admin user found. Creating one...");

      const hashedPassword = await bcrypt.hash("admin123", 10);

      const newAdminUser = new User({
        name: "Admin",
        email: "admin@domain.com",
        password: hashedPassword,
        role: "admin",
      });

      await newAdminUser.save();
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists!");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// Export as named exports
export { connectToDatabase };
