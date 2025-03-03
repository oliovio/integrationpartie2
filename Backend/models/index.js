import User from './User.js';
import Role from './Roles.js';
import Department from './Department.js';
import Equipement from './Equipement.js';
import Maintenance from './Maintenance.js';

// Associations User <-> Role
User.belongsTo(Role, {
    foreignKey: 'id_role',
    as: 'role'
});
Role.hasMany(User, {
    foreignKey: 'id_role',
    as: 'users'
});

// Associations User <-> Department
User.belongsTo(Department, {
    foreignKey: 'id_departement',
    as: 'departement'
});
Department.hasMany(User, {
    foreignKey: 'id_departement',
    as: 'utilisateurs'
});

// Association Department -> User (responsable)
Department.belongsTo(User, {
    foreignKey: 'responsable_id',
    as: 'responsable'
});

// Associations Department <-> Equipement
Department.hasMany(Equipement, {
    foreignKey: 'id_departement',
    as: 'equipements'
});
Equipement.belongsTo(Department, {
    foreignKey: 'id_departement',
    as: 'departement'
});

// Associations Equipement <-> Maintenance
Equipement.hasMany(Maintenance, {
    foreignKey: 'id_equipement',
    as: 'maintenances'
});
Maintenance.belongsTo(Equipement, {
    foreignKey: 'id_equipement',
    as: 'equipement'
});

export {
    User,
    Role,
    Department,
    Equipement,
    Maintenance
};
