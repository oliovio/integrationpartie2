import Role from './Roles.js';
import User from './User.js';
import Department from './Department.js';
import Equipement from './Equipement.js';
import MaintenanceHistory from './Maintenance.js';
import Category from './Category.js';

import { sequelize } from '../config/database.js';

// Création des relations

// Relation M:N entre Role et User via la table de jointure 'role_user'
Role.belongsToMany(User, {
  through: 'role_user',
  foreignKey: 'role_id',
  otherKey: 'user_id',
});
User.belongsToMany(Role, {
  through: 'role_user',
  foreignKey: 'user_id',
  otherKey: 'role_id',
});

// Relation 1:N entre Department et User
Department.hasMany(User, {
  foreignKey: 'department_id',
});
User.belongsTo(Department, {
  foreignKey: 'department_id',
});

// Relation 1:N entre Department et Equipement
Department.hasMany(Equipement, {
  foreignKey: 'id_depart',
});
Equipement.belongsTo(Department, {
  foreignKey: 'id_depart',
});

// Relation 1:N entre Category et Equipement
Category.hasMany(Equipement, {
  foreignKey: 'id_categorie',
});
Equipement.belongsTo(Category, {
  foreignKey: 'id_categorie',
});

// Relation 1:N entre User et Equipement
User.hasMany(Equipement, {
  foreignKey: 'id_utilisateur',
});
Equipement.belongsTo(User, {
  foreignKey: 'id_utilisateur',
});

// Relation 1:N entre Equipement et MaintenanceHistory
Equipement.hasMany(MaintenanceHistory, {
  foreignKey: 'id_equipement',
});
MaintenanceHistory.belongsTo(Equipement, {
  foreignKey: 'id_equipement',
});

// Relation 1:N entre User et MaintenanceHistory (pour le technicien)
User.hasMany(MaintenanceHistory, {
  foreignKey: 'technicien_id',
});
MaintenanceHistory.belongsTo(User, {
  foreignKey: 'technicien_id',
});

// Export des modèles avec relations
export { Role, User, Department, Equipement, MaintenanceHistory, Category };