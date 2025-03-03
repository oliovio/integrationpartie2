import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    prenom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            is: /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/
        }
    },
    date_embauche: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id_role'
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
    actif: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    derniere_connexion: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'date_creation',
    updatedAt: 'date_modification',
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

export default User;