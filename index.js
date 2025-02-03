import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leaveRouter from "./routes/leave.js";
import salaryRouter from "./routes/salary.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import { connectToDatabase, createAdminUserIfNeeded } from "./db/db.js";

dotenv.config();

// Connect to MongoDB
connectToDatabase();
createAdminUserIfNeeded();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://frontend-ma3z.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public/uploads"));

// Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);

// Set default port for local development
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
