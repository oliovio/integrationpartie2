import Role from '../models/Roles.js';  // Importation du modèle avec la nouvelle structure
import { sequelize } from '../config/dataBase.js';

// Ajouter un nouveau rôle
export const addRole = async (req, res) => {
  const { nom_role, description } = req.body;

  // Validation des champs requis
  if (!nom_role) {
    return res.status(400).json({ 
      message: 'Le nom du rôle est requis' 
    });
  }

  try {
    // Vérifier si un rôle avec le même nom existe déjà
    const existingRole = await Role.findOne({ where: { nom_role } });
    if (existingRole) {
      return res.status(400).json({ message: 'Un rôle avec ce nom existe déjà' });
    }

    // Créer un nouveau rôle
    const role = await Role.create({ nom_role, description });
    res.status(201).json({ 
      message: 'Rôle créé avec succès', 
      data: role 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du rôle', 
      error: error.message 
    });
  }
};

// Récupérer tous les rôles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    
    if (!roles.length) {
      return res.status(404).json({ message: 'Aucun rôle trouvé' });
    }

    res.status(200).json({ 
      message: 'Rôles récupérés avec succès',
      data: roles 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors du chargement des rôles', 
      error: error.message 
    });
  }
};

// Récupérer un rôle par ID
export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    
    if (role) {
      res.status(200).json({ 
        message: 'Rôle trouvé avec succès', 
        data: role 
      });
    } else {
      res.status(404).json({ message: 'Rôle non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du rôle', 
      error: error.message 
    });
  }
};

// Mettre à jour un rôle
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_role, description } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rôle non trouvé' });
    }

    // Mise à jour du rôle
    await Role.update(
      { nom_role, description },
      { where: { id } }
    );

    res.status(200).json({ message: 'Rôle mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du rôle',
      error: error.message
    });
  }
};

// Supprimer un rôle
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.destroy({
      where: { id }
    });
    
    if (role) {
      res.status(200).json({ message: 'Rôle supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Rôle non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du rôle', 
      error: error.message 
    });
  }
};
