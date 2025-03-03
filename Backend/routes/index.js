import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import equipementRoutes from './equipementRoutes.js';
import departmentRoutes from './departmentRoutes.js';
import maintenanceRoutes from './maintenanceRoutes.js';
import roleRoutes from '../app/api/roles/route.js';

const router = express.Router();

// Routes d'authentification
router.use('/auth', authRoutes);

// Routes utilisateurs
router.use('/users', userRoutes);

// Routes équipements
router.use('/equipements', equipementRoutes);

// Routes départements
router.use('/departments', departmentRoutes);

// Routes maintenance
router.use('/maintenance', maintenanceRoutes);

// Routes rôles
router.use('/roles', roleRoutes);

export default router;
