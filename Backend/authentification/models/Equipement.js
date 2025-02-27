import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Equipment = sequelize.define('Equipment', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modele: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero_serie: {
    type: DataTypes.STRING,
    unique: true, // Unique because each equipment should have a unique serial number
    allowNull: false
  },
  date_acquisition: {
    type: DataTypes.DATE,
    allowNull: false
  },
  prix_achat: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_derniere_maintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps by default
  underscored: true, // Use snake_case for column names
  freezeTableName: true // Prevents Sequelize from pluralizing the table name
});

export default Equipment;