import Department from "../models/Department.js"; // Ensure this model is defined correctly

// Fetch all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find(); // Fetch from the database
    res.json({ success: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error); // Log for debugging
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch departments" });
  }
};

// Add a department
export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body; // Ensure you're capturing both dep_name and description
    if (!dep_name || !description) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const newDepartment = new Department({ dep_name, description });
    await newDepartment.save();
    res.status(201).json({ success: true, department: newDepartment });
  } catch (error) {
    console.error("Error adding department:", error); // Log for debugging
    res.status(500).json({ success: false, error: "Failed to add department" });
  }
};

// Get a specific department by ID
export const getDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Extract department ID from URL parameters
    const department = await Department.findById(id); // Find department by ID

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    res.status(200).json({ success: true, department }); // Return the department data
  } catch (error) {
    console.error("Error fetching department:", error); // Log for debugging
    res
      .status(500)
      .json({ success: false, error: "Error fetching department" });
  }
};

// Update a specific department by ID
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Extract department ID
    const { dep_name, description } = req.body; // Ensure correct field names

    // Validate input
    if (!dep_name || !description) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Update the department
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true, runValidators: true } // Return updated document and enforce validation
    );

    if (!updatedDepartment) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    res.status(200).json({ success: true, department: updatedDepartment });
  } catch (error) {
    console.error("Error updating department:", error); // Log error
    res
      .status(500)
      .json({ success: false, error: "Error updating department" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Extract department ID
    console.log("Deleting department with ID:", id);

    // Validate that the ID is a valid MongoDB ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    // Find the department first
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    // Call deleteOne() on the document instance to trigger the middleware
    await department.deleteOne();
    res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ success: false, error: "Error deleting department" });
  }
};

