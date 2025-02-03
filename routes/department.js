import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { 
    addDepartment, 
    getDepartments, 
    getDepartment, 
    updateDepartment,
    deleteDepartment 
} from '../controllers/departmentController.js';

const router = express.Router();

// Fetch all departments
router.get('/', authMiddleware, getDepartments);

// Add a new department
router.post('/add', authMiddleware, addDepartment);

// Get a specific department by ID
router.get('/:id', authMiddleware, getDepartment);

// Update a department by ID
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware,deleteDepartment);

export default router;
