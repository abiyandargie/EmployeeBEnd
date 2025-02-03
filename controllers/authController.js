import User from '../models/Users.js';
import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" }); // Added return
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Wrong password" }); // Added return
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    // Send response with token and user details
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ success: false, error: error.message }); // Added return
  }
};

const verify = (req, res) => {
  return res.status(200).json({success: true,user: req.user})
}

export { login, verify };