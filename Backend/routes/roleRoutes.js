// routes/roleRoutes.js
import { Router } from 'express';
import { 
    addRole, 
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole 
} from '../controllers/roleController.js';

const router = Router();

router.get('/', getAllRoles)
    .get('/:id', getRoleById)
    .post('/', addRole)
    .put('/:id', updateRole)
    .delete('/:id', deleteRole);

export default router;
