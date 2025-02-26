import { User } from '../models/Relation.js';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/dataBase.js';

// Ajouter un utilisateur
export const addUser = async (req, res) => {
  const { nom, prenom, email, telephone, date_embauche, mot_de_passe } = req.body;

  // Validation des champs requis
  if (!nom || !prenom || !email || !telephone || !date_embauche || !mot_de_passe) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérifier si un utilisateur avec le même email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer l'utilisateur
    const user = await User.create({
      nom,
      prenom,
      email,
      telephone,
      date_embauche,
      mot_de_passe: hashedPassword
    });
    
    res.status(201).json({ message: 'Utilisateur créé avec succès', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
  }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: 'Role' }); // Inclure le modèle "Role"
    if (!users.length) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
    }
    res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du chargement des utilisateurs', error: error.message });
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { include: 'Role' });
    
    if (user) {
      res.status(200).json({ message: 'Utilisateur trouvé avec succès', data: user });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, telephone, date_embauche, mot_de_passe } = req.body;

  // Validation des champs requis
  if (!nom && !prenom && !email && !telephone && !date_embauche && !mot_de_passe) {
    return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const updates = { nom, prenom, email, telephone, date_embauche };
    if (mot_de_passe) {
      updates.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
    }

    await User.update(updates, { where: { id_utilisateur: id } });

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id_utilisateur: id } });

    if (user) {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
  }
};

// Récupérer les utilisateurs par département
export const getUsersByDepartment = async (req, res) => {
  const { departmentId } = req.params;

  // Validation de l'ID du département
  if (!departmentId) {
    return res.status(400).json({ message: 'L\'ID du département est requis' });
  }

  try {
    const users = await User.findAll({
      where: { id_departement: departmentId },
      include: ['Role', 'Department']
    });

    if (users.length) {
      res.status(200).json({ message: 'Utilisateurs du département récupérés avec succès', data: users });
    } else {
      res.status(404).json({ message: 'Aucun utilisateur trouvé dans ce département' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs du département', error: error.message });
  }
};
