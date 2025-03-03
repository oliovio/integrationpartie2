import Department from '../models/Department.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';

// Récupérer tous les départements avec pagination
export const getDepartments = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Department.findAndCountAll({
            limit,
            offset,
            order: [['nom', 'ASC']]
        });

        const response = paginatedResponse(
            'Départements récupérés avec succès',
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

// Récupérer un département par son ID
export const getDepartmentById = async (req, res, next) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            const response = errorResponse('Département non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        const response = successResponse('Département récupéré avec succès', department);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Créer un nouveau département
export const createDepartment = async (req, res, next) => {
    try {
        const department = await Department.create(req.body);
        logger.info(`Nouveau département créé: ${department.nom}`);

        const response = successResponse('Département créé avec succès', department, 201);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Mettre à jour un département
export const updateDepartment = async (req, res, next) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            const response = errorResponse('Département non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        await department.update(req.body);
        logger.info(`Département mis à jour: ${department.nom}`);

        const response = successResponse('Département mis à jour avec succès', department);
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};

// Supprimer un département
export const deleteDepartment = async (req, res, next) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            const response = errorResponse('Département non trouvé', null, 404);
            return res.status(response.statusCode).json(response.body);
        }

        // Vérifier si le département a des utilisateurs ou des équipements
        const hasUsers = await department.countUtilisateurs();
        const hasEquipments = await department.countEquipements();

        if (hasUsers > 0 || hasEquipments > 0) {
            const response = errorResponse(
                'Impossible de supprimer le département car il contient des utilisateurs ou des équipements',
                null,
                400
            );
            return res.status(response.statusCode).json(response.body);
        }

        await department.update({ actif: false });
        logger.info(`Département désactivé: ${department.nom}`);

        const response = successResponse('Département désactivé avec succès');
        res.status(response.statusCode).json(response.body);
    } catch (error) {
        next(error);
    }
};