import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { MAINTENANCE_TYPES, MAINTENANCE_STATUS } from '../config/constants.js';

const Maintenance = sequelize.define('Maintenance', {
    id_maintenance: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_equipement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Equipements',
            key: 'id_equipement'
        }
    },
    date_maintenance: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    type_maintenance: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [Object.values(MAINTENANCE_TYPES)]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 1000]
        }
    },
    cout: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    technicien: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    statut: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: MAINTENANCE_STATUS.PLANNED,
        validate: {
            isIn: [Object.values(MAINTENANCE_STATUS)]
        }
    },
    recommandations: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    date_fin: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isAfterDateMaintenance(value) {
                if (value && value < this.date_maintenance) {
                    throw new Error('La date de fin doit être postérieure à la date de maintenance');
                }
            }
        }
    },
    pieces_changees: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    duree_intervention: {
        type: DataTypes.INTEGER, // en minutes
        allowNull: true,
        validate: {
            min: 0,
            max: 10080 // Maximum 7 jours en minutes
        }
    }
}, {
    tableName: 'Maintenances',
    timestamps: true,
    createdAt: 'date_creation',
    updatedAt: 'date_modification',
    indexes: [
        {
            fields: ['id_equipement']
        },
        {
            fields: ['date_maintenance']
        },
        {
            fields: ['statut']
        }
    ]
});

export default Maintenance;