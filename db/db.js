import bcrypt from "bcryptjs";
import User from "../models/Users.js"; // Adjust path if needed

// Function to create an admin user if it doesn't exist
export const createAdminUserIfNeeded = async () => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      console.log("No admin user found. Creating one...");

      const hashedPassword = await bcrypt.hash("admin123", 10); // Hash the password before saving

      const newAdminUser = new User({
        name: "Admin",
        email: "admin@domain.com", // You can replace with environment variable
        password: hashedPassword, // Save the hashed password
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
