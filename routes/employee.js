import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    addEmployee, 
    upload,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeeByDepId
    
} from '../controllers/employeeController.js';

const router = express.Router();

// Fetch all departments
router.get('/', authMiddleware, getEmployees);

// Add a new department
router.post('/add', authMiddleware,upload.single('image'), addEmployee);

// Get a specific department by ID
router.get('/:id', authMiddleware, getEmployee);

// Update a department by ID
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware,fetchEmployeeByDepId);

export default router;
