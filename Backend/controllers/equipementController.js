import { Equipement } from '../models/Relation.js';
import { sequelize } from '../config/dataBase.js';

// Créer un nouvel équipement
export const addEquipement = async (req, res) => {
    try {
        const {
            nom,
            type,
            marque,
            modele,
            numero_serie,
            date_acquisition,
            prix_achat,
            etat,
            localisation,
            date_derniere_maintenance,
            statut,
            departmentId
        } = req.body;

        // Vérification des champs obligatoires
        if (!nom || !type || !marque || !numero_serie || !date_acquisition || !prix_achat) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez remplir tous les champs obligatoires'
            });
        }

        // Vérification si le numéro de série existe déjà
        const equipementExistant = await Equipement.findOne({
            where: { numero_serie }
        });

        if (equipementExistant) {
            return res.status(400).json({
                success: false,
                message: 'Un équipement avec ce numéro de série existe déjà'
            });
        }

        // Création de l'équipement
        const nouvelEquipement = await Equipement.create({
            nom,
            type,
            marque,
            modele,
            numero_serie,
            date_acquisition,
            prix_achat,
            etat,
            localisation,
            date_derniere_maintenance,
            statut,
            departmentId
        });

        res.status(201).json({
            success: true,
            message: 'Équipement créé avec succès',
            data: nouvelEquipement
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de l\'équipement',
            error: error.message
        });
    }
};

// Récupérer tous les équipements
export const getAllEquipements = async (req, res) => {
    try {
        const equipements = await Equipement.findAll({
            include: ['department']
        });

        res.status(200).json({
            success: true,
            count: equipements.length,
            data: equipements
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des équipements',
            error: error.message
        });
    }
};

// Récupérer un équipement par son ID
export const getEquipementById = async (req, res) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id, {
            include: ['department']
        });

        if (!equipement) {
            return res.status(404).json({
                success: false,
                message: 'Équipement non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: equipement
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de l\'équipement',
            error: error.message
        });
    }
};

// Mettre à jour un équipement
export const updateEquipement = async (req, res) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id);

        if (!equipement) {
            return res.status(404).json({
                success: false,
                message: 'Équipement non trouvé'
            });
        }

        // Vérification du numéro de série si modifié
        if (req.body.numero_serie && req.body.numero_serie !== equipement.numero_serie) {
            const equipementExistant = await Equipement.findOne({
                where: { numero_serie: req.body.numero_serie }
            });

            if (equipementExistant) {
                return res.status(400).json({
                    success: false,
                    message: 'Ce numéro de série est déjà utilisé'
                });
            }
        }

        await equipement.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Équipement mis à jour avec succès',
            data: equipement
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour de l\'équipement',
            error: error.message
        });
    }
};

// Supprimer un équipement
export const deleteEquipement = async (req, res) => {
    try {
        const equipement = await Equipement.findByPk(req.params.id);

        if (!equipement) {
            return res.status(404).json({
                success: false,
                message: 'Équipement non trouvé'
            });
        }

        await equipement.destroy();

        res.status(200).json({
            success: true,
            message: 'Équipement supprimé avec succès'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression de l\'équipement',
            error: error.message
        });
    }
};

// Rechercher des équipements par département
export const getEquipementsByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        const equipements = await Equipement.findAll({
            where: { departmentId },
            include: ['department']
        });

        res.status(200).json({
            success: true,
            count: equipements.length,
            data: equipements
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des équipements par département',
            error: error.message
        });
    }
};

// Rechercher des équipements par statut
export const getEquipementsByStatus = async (req, res) => {
    try {
        const { statut } = req.params;

        const equipements = await Equipement.findAll({
            where: { statut },
            include: ['department']
        });

        res.status(200).json({
            success: true,
            count: equipements.length,
            data: equipements
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des équipements par statut',
            error: error.message
        });
    }
};

// Rechercher des équipements par type
export const getEquipementsByType = async (req, res) => {
    try {
        const { type } = req.params;

        const equipements = await Equipement.findAll({
            where: { type },
            include: ['department']
        });

        res.status(200).json({
            success: true,
            count: equipements.length,
            data: equipements
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des équipements par type',
            error: error.message
        });
    }
};

// Rechercher des équipements par marque
export const getEquipementsByBrand = async (req, res) => {
    try {
        const { marque } = req.params;

        const equipements = await Equipement.findAll({
            where: { marque },
            include: ['department']
        });

        res.status(200).json({
            success: true,
            count: equipements.length,
            data: equipements
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des équipements par marque',
            error: error.message
        });
    }
};