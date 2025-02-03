import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure unique email
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
