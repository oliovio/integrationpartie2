import { MaintenanceHistory } from '../models/Relation.js';
import { sequelize } from '../config/dataBase.js';

// Ajouter un nouvel historique de maintenance
export const addMaintenanceHistory = async (req, res) => {
  const { date, description, cout, equipementId } = req.body;

  // Validation des champs requis
  if (!date || !description || !cout || !equipementId) {
    return res.status(400).json({
      message: 'Tous les champs obligatoires doivent être remplis'
    });
  }

  try {
    const history = await MaintenanceHistory.create({
      date,
      description, 
      cout,
      equipementId
    });

    res.status(201).json({ 
      message: 'Historique de maintenance créé avec succès',
      data: history 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'historique de maintenance',
      error: error.message 
    });
  }
};

// Récupérer tout l'historique de maintenance
export const getAllMaintenanceHistory = async (req, res) => {
  try {
    const history = await MaintenanceHistory.findAll({
      include: ['equipement'] // Inclure la relation avec l'équipement
    });

    if (!history.length) {
      return res.status(404).json({ message: 'Aucun historique de maintenance trouvé' });
    }

    res.status(200).json({
      message: 'Historiques de maintenance récupérés avec succès', 
      data: history 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors du chargement des historiques de maintenance',
      error: error.message 
    });
  }
};

// Récupérer un historique de maintenance par ID
export const getMaintenanceHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await MaintenanceHistory.findByPk(id, {
      include: ['equipement']
    });
    
    if (history) {
      res.status(200).json({ 
        message: 'Historique de maintenance trouvé avec succès',
        data: history 
      });
    } else {
      res.status(404).json({ message: 'Historique de maintenance non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération de l\'historique de maintenance',
      error: error.message 
    });
  }
};

// Mettre à jour un historique de maintenance
export const updateMaintenanceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, cout, equipementId } = req.body;

    const history = await MaintenanceHistory.findByPk(id);
    if (!history) {
      return res.status(404).json({ message: 'Historique de maintenance non trouvé' });
    }

    await MaintenanceHistory.update(
      { date, description, cout, equipementId },
      { where: { id } }
    );

    res.status(200).json({ message: 'Historique de maintenance mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de l\'historique de maintenance',
      error: error.message
    });
  }
};

// Récupérer l'historique de maintenance par équipement
export const getMaintenanceHistoryByEquipement = async (req, res) => {
  try {
    const { equipementId } = req.params;
    const history = await MaintenanceHistory.findAll({
      where: { equipementId },
      include: ['equipement']
    });

    if (history.length) {
      res.status(200).json({
        message: 'Historique de maintenance trouvé avec succès',
        data: history
      });
    } else {
      res.status(404).json({ message: 'Aucun historique de maintenance trouvé pour cet équipement' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de l\'historique de maintenance',
      error: error.message
    });
  }
};

// Supprimer un historique de maintenance
export const deleteMaintenanceHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await MaintenanceHistory.destroy({
      where: { id }
    });
    
    if (history) {
      res.status(200).json({ message: 'Historique de maintenance supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Historique de maintenance non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression de l\'historique de maintenance',
      error: error.message 
    });
  }
};
