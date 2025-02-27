// routes/userRoutes.js
import { Router } from 'express';
import { 
    addUser, 
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUsersByDepartment 
} from '../controllers/userController.js';

const router = Router();

router
    .get('/', getAllUsers)
    .get('/:id', getUserById)
    .get('/department/:id', getUsersByDepartment)
    .post('/', addUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser);

export default router;
