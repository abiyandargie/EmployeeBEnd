import Leave from "../models/Leave.js";
import Employee from "../models/employee.js";

// Add Leave
const addLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const userId = req.user._id;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Create the leave request
    const newLeave = new Leave({
      employeeId: userId, // Ensure we use `employeeId`
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending", // Default status
    });

    await newLeave.save();
    return res
      .status(201)
      .json({ success: true, message: "Leave added successfully" });
  } catch (error) {
    console.error("Error adding leave:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error while adding leave" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params; // Get the employee ID from URL
    const user = req.user;

    let leaves;

    if (user.role === "admin") {
      leaves = await Leave.find({ employeeId: id }).lean();
    } else {
      leaves = await Leave.find({ employeeId: user._id }).lean();
    }

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ success: false, error: "No leaves found" });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res
      .status(500)
      .json({ success: false, error: "Server error while fetching leaves" });
  }
};

// Get All Leaves
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate({
        path: "employeeId",
        // select: "department",
        populate: [
          { path: "department", select: "dep_name" }, // Only fetch department name
          { path: "userId", select: "name" }, // Only fetch user name
        ],
      })
      .lean();

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res
      .status(500)
      .json({ success: false, error: "Leave fetch server error" });
  }
};

const getLeaveDetail = async (req, res) => {
  const { id } = req.params; // Get the leave ID from the URL

  try {
    const leave = await Leave.findById(id)
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name profileImage" },
        ],
      })
      .lean();

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Error fetching leave details:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error fetching leave details" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, error: "Leave not founded" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "leave update server error" });
  }
};

// Export Controllers
export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
