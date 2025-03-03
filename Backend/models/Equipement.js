import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { EQUIPMENT_TYPES, EQUIPMENT_STATUS } from '../config/constants.js';

const Equipment = sequelize.define('Equipment', {
    id_equipement: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [Object.values(EQUIPMENT_TYPES)]
        }
    },
    marque: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    modele: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    numero_serie: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
        validate: {
            len: [0, 50]
        }
    },
    date_acquisition: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    date_fin_garantie: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    statut: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: EQUIPMENT_STATUS.AVAILABLE,
        validate: {
            isIn: [Object.values(EQUIPMENT_STATUS)]
        }
    },
    id_departement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Departments',
            key: 'id_departement'
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },
    cout_acquisition: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    derniere_maintenance: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    prochaine_maintenance: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: 'Equipements',
    timestamps: true,
    createdAt: 'date_creation',
    updatedAt: 'date_modification',
    indexes: [
        {
            unique: true,
            fields: ['numero_serie']
        },
        {
            fields: ['type']
        },
        {
            fields: ['statut']
        },
        {
            fields: ['id_departement']
        }
    ]
});

export default Equipment;