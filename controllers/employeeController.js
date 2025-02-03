import path from "path";
import Employee from "../models/employee.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import multer from "multer";
// import Department from "../models/department.js"; 

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

// Controller function to add an employee
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Check if the user email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User email already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new User document
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });
        const savedUser = await newUser.save();

        // Create a new Employee document
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        console.error("Error adding employee:", error.message);
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

// Fetch all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', { password: 0 })
            .populate('department')
            .lean(); // Fetch from the database with better performance
            
       return res.json({ success: true, employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch employees' });
    }
};

// Fetch a single employee by ID
const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        let employee
     employee = await Employee.findById({_id: id})
            .populate('userId', { password: 0 })
            .populate('department')
            .lean();
        if (!employee) {
            employee = await Employee.findOne({userId: id})
            .populate('userId', { password: 0 })
            .populate('department')
        }

        return res.status(200).json({success: true, employee})
 
    } catch (error) {
        console.error('Error fetching employee:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch employee' });
    }
};

// Update employee details
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }

        const user = await User.findById(employee.userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            employee.userId,
            { name },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ success: false, error: 'Error updating user' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { maritalStatus, designation, salary, department },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(400).json({ success: false, error: 'Error updating employee' });
        }

        return res.status(200).json({ success: true, message: 'Employee updated successfully' });

    } catch (error) {
        console.error('Error updating employee:', error);
        return res.status(500).json({ success: false, error: 'Server error updating employee' });
    }
};
 
const fetchEmployeeByDepId = async (req, res) => {
    const { id } = req.params;

    try {
        const employees = await Employee.find({ department: id })
            .populate('userId', { password: 0 })
            .populate('department')
            .lean();

        return res.json({ success: true, employees });
    } catch (error) {
        console.error('Error fetching employees by department ID:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch employees by department ID' });
    }
};


export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeeByDepId };
