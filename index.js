import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import leaveRouter from "./routes/leave.js";
import salaryRoute from "./routes/salary.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import connectToDatabase from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

connectToDatabase();

const app = express();
app.use(
  cors({
    origin: "https://frontend-ma3z.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public/uploads"));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/dashboard", dashboardRouter);

app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRoute);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
