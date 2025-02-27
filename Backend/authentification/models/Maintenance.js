import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Maintenance = sequelize.define('Maintenance', {
  date_maintenance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description_probleme: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  action_effectuee: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cout: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  temps_intervention: {
    type: DataTypes.INTEGER, // en minutes
    allowNull: false
  },
  pieces_changees: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false
  },
  date_modification: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false, // Nous gérons nous-mêmes les dates de création et modification
  underscored: true, // Utilisation du snake_case pour les noms de colonnes
  freezeTableName: true // Empêche Sequelize de pluraliser le nom de la table
});

export default Maintenance;