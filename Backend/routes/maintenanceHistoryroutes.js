// routes/maintenanceHistoryRoutes.js
import { Router } from 'express';
import { 
    addMaintenanceHistory, 
    getAllMaintenanceHistory,
    getMaintenanceHistoryById,
    updateMaintenanceHistory,
    deleteMaintenanceHistory,
    getMaintenanceHistoryByEquipement
} from '../controllers/maintenanceHistoryController.js';

const router = Router();

router.get('/', getAllMaintenanceHistory)
    .get('/:id', getMaintenanceHistoryById)
    .get('/equipement/:id', getMaintenanceHistoryByEquipement)
    .post('/', addMaintenanceHistory)
    .put('/:id', updateMaintenanceHistory)
    .delete('/:id', deleteMaintenanceHistory);

export default router;