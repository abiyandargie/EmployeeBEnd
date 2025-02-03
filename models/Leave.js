import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String,
    enum:['Sick Leave', 'Causal Leave', 'Annual Leave'],
    required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, 
    enum: ['Pending', 'Approved', 'Rejected'],
    default: "Pending" }, // Optional: Add a status field
  appliedAt: { type: Date, default: Date.now }, // Optional: Track when the leave was applied
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;