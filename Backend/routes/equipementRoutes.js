import { Router } from 'express';
import { 
    addEquipement, 
    getAllEquipements,
    getEquipementById,
    updateEquipement,
    deleteEquipement,
    getEquipementsByDepartment,
    getEquipementsByStatus,  // Ajout de l'importation
    getEquipementsByType,    // Ajout de l'importation
    getEquipementsByBrand    // Ajout de l'importation
} from '../controllers/equipementController.js'; // Assure-toi que ces fonctions existent dans le contrôleur

const router = Router();

// Routes principales
router.post('/', addEquipement);
router.get('/', getAllEquipements);
router.get('/:id', getEquipementById);
router.put('/:id', updateEquipement);
router.delete('/:id', deleteEquipement);

// Route pour filtrer par département
router.get('/department/:departmentId', getEquipementsByDepartment);

// Nouvelles routes pour filtrer par statut, type et marque
router.get('/status/:statut', getEquipementsByStatus); // Pour filtrer par statut
router.get('/type/:type', getEquipementsByType);       // Pour filtrer par type
router.get('/marque/:marque', getEquipementsByBrand);  // Pour filtrer par marque

export default router;