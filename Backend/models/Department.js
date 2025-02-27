import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Department = sequelize.define('Department', {
  nom: {
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
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: false
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget_annuel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true, // Ajoute les champs 'createdAt' et 'updatedAt' par défaut
  underscored: true, // Utilisation de noms de colonnes avec un underscore
  freezeTableName: true // Empêche Sequelize de modifier le nom de la table
});

export default Department;
