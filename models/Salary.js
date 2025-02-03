import mongoose, { Schema } from "mongoose";

const salarySchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    basicSalary: { type: Number, required: true },
    allowance: { type: Number, required: true }, // Fixed from Date to Number
    deduction: { type: Number, required: true },
    netSalary: { type: Number, required: true },
    payDate: { type: Date, required: true },
  },
  { timestamps: true } // Auto-creates createdAt & updatedAt
);

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;
