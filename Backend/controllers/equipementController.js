import Equipement from '../models/Equipement.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';
import { EQUIPMENT_STATUS } from '../config/constants.js';

// Récupérer tous les équipements avec pagination et filtres
export const getEquipements = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Construire les filtres
        const where = {};
        if (req.query.type) where.type = req.query.type;
        if (req.query.statut) where.statut = req.query.statut;
        if (req.query.id_departement) where.id_departement = req.query.id_departement;

        const { count, rows } = await Equipement.findAndCountAll({
            where,
            limit,
            offset,
            order: [['date_acquisition', 'DESC']]
        });

        const response = paginatedResponse(
            'Équipements récupérés avec succès',
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

// Récupérer un équipement par son ID
export const getEquipementById = async (req, res, next) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id);

        if (!equipement) {
            const response = errorResponse('Équipement non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        const response = successResponse('Équipement récupéré avec succès', equipement);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Créer un nouvel équipement
export const createEquipement = async (req, res, next) => {
    try {
        const equipement = await Equipement.create(req.body);
        logger.info(`Nouvel équipement créé: ${equipement.nom}`);

        const response = successResponse('Équipement créé avec succès', equipement, 201);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour un équipement
export const updateEquipement = async (req, res, next) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id);

        if (!equipement) {
            const response = errorResponse('Équipement non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        await equipement.update(req.body);
        logger.info(`Équipement mis à jour: ${equipement.nom}`);

        const response = successResponse('Équipement mis à jour avec succès', equipement);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Supprimer un équipement
export const deleteEquipement = async (req, res, next) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id);

        if (!equipement) {
            const response = errorResponse('Équipement non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        // Vérifier si l'équipement est en cours d'utilisation
        if (equipement.statut === EQUIPMENT_STATUS.IN_USE) {
            const response = errorResponse('Impossible de supprimer un équipement en cours d\'utilisation', null, 400);
            return res.status(response.statusCode).json(response.body);
        }

        await equipement.destroy();
        logger.info(`Équipement supprimé: ${equipement.nom}`);

        const response = successResponse('Équipement supprimé avec succès');
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};