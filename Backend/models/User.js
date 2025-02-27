import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Utilisateur = sequelize.define('User', {
  id_utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true, // ID unique pour chaque utilisateur
    autoIncrement: true, // Incrémentation automatique de l'ID
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false, // Le nom ne peut pas être vide
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false, // Le prénom ne peut pas être vide
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // L'email doit être unique
    allowNull: false, // L'email ne peut pas être vide
    validate: {
      isEmail: true, // Vérifie que l'email est valide
    },
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false, // Le téléphone ne peut pas être vide
  },
  date_embauche: {
    type: DataTypes.DATE,
    allowNull: false, // La date d'embauche ne peut pas être vide
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true, // Ajoute les champs de création et de mise à jour automatiques
  underscored: true, // Utilisation du snake_case pour les noms de colonnes
  freezeTableName: true, // Le nom de la table ne sera pas modifié
});

export default Utilisateur;