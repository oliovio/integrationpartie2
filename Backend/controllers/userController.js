import User from '../models/User.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseFormatter.js';
import logger from '../config/logger.js';

// Ajouter un utilisateur
export const addUser = async (req, res) => {
  const { nom, prenom, email, telephone, date_embauche, mot_de_passe, roleId, departmentId } = req.body;

  // Validation des champs requis
  if (!nom || !prenom || !email || !telephone || !date_embauche || !mot_de_passe || !roleId || !departmentId) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérifier si un utilisateur avec le même email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Vérifier si le rôle existe
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Le rôle spécifié n\'existe pas' });
    }

    // Vérifier si le département existe
    const department = await Department.findByPk(departmentId);
    if (!department) {
      return res.status(400).json({ message: 'Le département spécifié n\'existe pas' });
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
      mot_de_passe: hashedPassword,
      id_role: roleId,
      id_departement: departmentId
    });
    
    // Récupérer l'utilisateur avec ses relations
    const newUser = await User.findByPk(user.id_utilisateur, {
      include: ['Role', 'Department'],
      attributes: { exclude: ['mot_de_passe'] }
    });
    
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès', 
      data: newUser 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la création de l\'utilisateur', 
      error: error.message 
    });
  }
};

// Récupérer tous les utilisateurs avec pagination
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ['mot_de_passe'] },
      limit,
      offset,
      order: [['nom', 'ASC']]
    });

    const response = paginatedResponse(
      'Utilisateurs récupérés avec succès',
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

// Récupérer un utilisateur par son ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['mot_de_passe'] }
    });

    if (!user) {
      const response = errorResponse('Utilisateur non trouvé', null, 404);
      return res.status(response.statusCode).json(response.body);
    }

    const response = successResponse('Utilisateur récupéré avec succès', user);
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      const response = errorResponse('Utilisateur non trouvé', null, 404);
      return res.status(response.statusCode).json(response.body);
    }

    // Vérifier les permissions
    if (req.user.id_utilisateur !== user.id_utilisateur && req.user.id_role !== 1) {
      const response = errorResponse('Permission refusée', null, 403);
      return res.status(response.statusCode).json(response.body);
    }

    await user.update(req.body);
    logger.info(`Utilisateur mis à jour: ${user.email}`);

    const response = successResponse('Utilisateur mis à jour avec succès', {
      id: user.id_utilisateur,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email
    });
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      const response = errorResponse('Utilisateur non trouvé', null, 404);
      return res.status(response.statusCode).json(response.body);
    }

    // Vérifier les permissions (seul un admin peut supprimer)
    if (req.user.id_role !== 1) {
      const response = errorResponse('Permission refusée', null, 403);
      return res.status(response.statusCode).json(response.body);
    }

    // Soft delete (mettre actif à false au lieu de supprimer)
    await user.update({ actif: false });
    logger.info(`Utilisateur désactivé: ${user.email}`);

    const response = successResponse('Utilisateur désactivé avec succès');
    res.status(response.statusCode).json(response.body);
  } catch (error) {
    next(error);
  }
};

// Récupérer les utilisateurs par département
export const getUsersByDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: 'Département non trouvé' });
    }

    const users = await User.findAll({
      where: { id_departement: id },
      include: ['Role', 'Department'],
      attributes: { exclude: ['mot_de_passe'] }
    });

    if (!users.length) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé dans ce département' });
    }

    res.status(200).json({ 
      message: 'Utilisateurs du département récupérés avec succès', 
      data: users 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des utilisateurs du département', 
      error: error.message 
    });
  }
};
