// Liste des départements
import { Department } from '../models/Relation.js';
import { sequelize } from '../config/dataBase.js';

export const departmentList = async (req, res) => {
    try {
        const departments = await Department.findAll();
        if (!departments.length) {
            return res.status(404).json({ message: 'Aucun département trouvé' });
        }
        res.status(200).json({ data: departments });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des départements', error: err.message });
    }
};

// Créer un nouveau département
// Créer un nouveau département
export const addDepartment = async (req, res) => {
    const { nom, description, responsable, localisation, budget_annuel, date_creation } = req.body;

    if (!nom) {
        return res.status(400).json({ message: 'Le nom du département est requis' });
    }

    try {
        // Vérifier si un département avec ce nom existe déjà
        const existingDepartment = await Department.findOne({ where: { nom } });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Ce département existe déjà' });
        }

        // Créer un département avec les nouveaux champs
        const result = await Department.create({
            nom,
            description,
            responsable,
            localisation,
            budget_annuel,
            date_creation
        });

        res.status(201).json({ 
            message: 'Département créé avec succès', 
            data: result 
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Erreur lors de la création du département', 
            error: err.message 
        });
    }
};

// Récupérer un département par ID
export const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByPk(id);
        
        if (department) {
            res.status(200).json({
                message: 'Département trouvé avec succès',
                data: department
            });
        } else {
            res.status(404).json({ message: 'Département non trouvé' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération du département',
            error: error.message
        });
    }
};

// Mettre à jour un département
export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, responsable, localisation, budget_annuel, date_creation } = req.body;

        // Chercher le département à mettre à jour
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ message: 'Département non trouvé' });
        }

        // Mettre à jour le département avec les nouveaux champs
        await Department.update(
            { nom, description, responsable, localisation, budget_annuel, date_creation },
            { where: { id } }
        );

        res.status(200).json({ message: 'Département mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la mise à jour du département',
            error: error.message
        });
    }
};

// Supprimer un département
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Department.destroy({ where: { id } });
        
        if (result) {
            res.status(200).json({ message: 'Département supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Département non trouvé' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la suppression du département',
            error: error.message
        });
    }
};