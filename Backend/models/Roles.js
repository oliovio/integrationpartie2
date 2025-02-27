import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Role = sequelize.define('Role', {
  nom_role: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true, // Enregistrement des dates de création et modification
  underscored: true, // Utilisation du snake_case pour les noms de colonnes
  freezeTableName: true // Empêche Sequelize de pluraliser le nom de la table
});

export default Role;