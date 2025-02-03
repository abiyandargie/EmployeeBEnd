import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Optional: Add authentication middleware
import { changePassword } from "../controllers/SettingController.js";

const router = express.Router();

router.put("/change-password", authMiddleware, changePassword); // Protect the route with authMiddleware

export default router;
