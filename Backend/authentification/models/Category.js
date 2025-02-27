import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dataBase.js';

const Category = sequelize.define('Category', {
  nom_categorie: {
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
  budget_annuel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  nombre_equipements: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  derniere_mise_a_jour: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true, // Ajoute les champs 'createdAt' et 'updatedAt' par défaut
  underscored: true, // Utilisation de noms de colonnes avec un underscore
  freezeTableName: true // Empêche Sequelize de modifier le nom de la table
});

export default Category;