import Maintenance from '../models/Maintenance.js';
import Equipement from '../models/Equipement.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';
import { MAINTENANCE_STATUS, EQUIPMENT_STATUS } from '../config/constants.js';

// Récupérer toutes les maintenances avec pagination et filtres
export const getMaintenances = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Construire les filtres
        const where = {};
        if (req.query.statut) where.statut = req.query.statut;
        if (req.query.type) where.type = req.query.type;
        if (req.query.id_equipement) where.id_equipement = req.query.id_equipement;

        const { count, rows } = await Maintenance.findAndCountAll({
            where,
            include: [{ model: Equipement, as: 'equipement' }],
            limit,
            offset,
            order: [['date_maintenance', 'DESC']]
        });

        const response = paginatedResponse(
            'Maintenances récupérées avec succès',
            rows,
            page,
            limit,
            count
        );

        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Récupérer une maintenance par son ID
export const getMaintenanceById = async (req, res, next) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id, {
            include: [{ model: Equipement, as: 'equipement' }]
        });

        if (!maintenance) {
            const response = errorResponse('Maintenance non trouvée', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        const response = successResponse('Maintenance récupérée avec succès', maintenance);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Créer une nouvelle maintenance
export const createMaintenance = async (req, res, next) => {
    try {
        const { id_equipement, ...maintenanceData } = req.body;

        // Vérifier si l'équipement existe
        const equipement = await Equipement.findByPk(id_equipement);
        if (!equipement) {
            const response = errorResponse('Équipement non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        // Créer la maintenance
        const maintenance = await Maintenance.create({
            ...maintenanceData,
            id_equipement,
            statut: MAINTENANCE_STATUS.SCHEDULED
        });

        // Mettre à jour le statut de l'équipement
        await equipement.update({ statut: EQUIPMENT_STATUS.IN_MAINTENANCE });

        logger.info(`Nouvelle maintenance créée pour l'équipement: ${equipement.nom}`);

        const response = successResponse('Maintenance créée avec succès', maintenance, 201);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour une maintenance
export const updateMaintenance = async (req, res, next) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id);

        if (!maintenance) {
            const response = errorResponse('Maintenance non trouvée', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        // Si le statut change à "terminé", mettre à jour l'équipement
        if (req.body.statut === MAINTENANCE_STATUS.COMPLETED && maintenance.statut !== MAINTENANCE_STATUS.COMPLETED) {
            const equipement = await Equipement.findByPk(maintenance.id_equipement);
            if (equipement) {
                await equipement.update({
                    statut: EQUIPMENT_STATUS.AVAILABLE,
                    date_derniere_maintenance: new Date()
                });
            }
        }

        await maintenance.update(req.body);
        logger.info(`Maintenance mise à jour: ID ${maintenance.id_maintenance}`);

        const response = successResponse('Maintenance mise à jour avec succès', maintenance);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Supprimer une maintenance
export const deleteMaintenance = async (req, res, next) => {
    try {
        const maintenance = await Maintenance.findByPk(req.params.id);

        if (!maintenance) {
            const response = errorResponse('Maintenance non trouvée', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        // Ne pas permettre la suppression des maintenances terminées
        if (maintenance.statut === MAINTENANCE_STATUS.COMPLETED) {
            const response = errorResponse('Impossible de supprimer une maintenance terminée', null, 400);
            return res.status(response.statusCode).json(response.body);
        }

        // Si la maintenance est en cours, mettre à jour le statut de l'équipement
        if (maintenance.statut === MAINTENANCE_STATUS.IN_PROGRESS) {
            const equipement = await Equipement.findByPk(maintenance.id_equipement);
            if (equipement) {
                await equipement.update({ statut: EQUIPMENT_STATUS.AVAILABLE });
            }
        }

        await maintenance.destroy();
        logger.info(`Maintenance supprimée: ID ${maintenance.id_maintenance}`);

        const response = successResponse('Maintenance supprimée avec succès');
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};
