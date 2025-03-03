import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
    id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: [0, 200]
        }
    },
    permissions: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        validate: {
            isValidPermissions(value) {
                if (!Array.isArray(value)) {
                    throw new Error('Les permissions doivent être un tableau');
                }
                const validPermissions = [
                    'GESTION_UTILISATEURS',
                    'GESTION_EQUIPEMENTS',
                    'GESTION_MAINTENANCE',
                    'LECTURE_SEULE',
                    'ADMIN'
                ];
                if (!value.every(perm => validPermissions.includes(perm))) {
                    throw new Error('Permissions invalides détectées');
                }
            }
        }
    }
}, {
    tableName: 'Roles',
    timestamps: true,
    createdAt: 'date_creation',
    updatedAt: 'date_modification',
    indexes: [
        {
            unique: true,
            fields: ['nom']
        }
    ]
});

export default Role;