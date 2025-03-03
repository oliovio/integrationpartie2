import bcrypt from 'bcrypt';
import { User, Role, Department } from '../models/index.js';
import sequelize from '../config/database.js';

const users = [
    {
        nom: "Dubois",
        prenom: "Marie",
        email: "marie.dubois@entreprise.com",
        mot_de_passe: "Admin123!",
        telephone: "514-555-0001",
        date_embauche: "2024-01-15",
        actif: true
    },
    {
        nom: "Martin",
        prenom: "Paul",
        email: "paul.martin@entreprise.com",
        mot_de_passe: "Gestionnaire123!",
        telephone: "514-555-0002",
        date_embauche: "2024-02-01",
        actif: true
    },
    {
        nom: "Lambert",
        prenom: "Sophie",
        email: "sophie.lambert@entreprise.com",
        mot_de_passe: "Tech123!",
        telephone: "514-555-0003",
        date_embauche: "2024-02-15",
        actif: true
    }
];

const roles = {
    "Administrateur": {
        description: "Accès complet au système",
        permissions: ["ADMIN", "GESTION_UTILISATEURS", "GESTION_EQUIPEMENTS", "GESTION_MAINTENANCE"]
    },
    "Gestionnaire": {
        description: "Gestion des équipements et maintenance",
        permissions: ["GESTION_EQUIPEMENTS", "GESTION_MAINTENANCE"]
    },
    "Technicien": {
        description: "Maintenance des équipements",
        permissions: ["GESTION_MAINTENANCE"]
    }
};

const departments = {
    "IT": {
        description: "Département informatique"
    },
    "Support": {
        description: "Département support"
    },
    "Maintenance": {
        description: "Département maintenance"
    }
};

const userRoles = {
    "marie.dubois@entreprise.com": "Administrateur",
    "paul.martin@entreprise.com": "Gestionnaire",
    "sophie.lambert@entreprise.com": "Technicien"
};

const userDepartments = {
    "marie.dubois@entreprise.com": "IT",
    "paul.martin@entreprise.com": "Support",
    "sophie.lambert@entreprise.com": "Maintenance"
};

async function initUsers() {
    try {
        await sequelize.sync();

        // Créer les rôles
        const createdRoles = {};
        for (const [roleName, roleData] of Object.entries(roles)) {
            const [role] = await Role.findOrCreate({
                where: { nom: roleName },
                defaults: {
                    ...roleData
                }
            });
            createdRoles[roleName] = role;
        }

        // Créer les départements
        const createdDepts = {};
        for (const [deptName, deptData] of Object.entries(departments)) {
            const [dept] = await Department.findOrCreate({
                where: { nom: deptName },
                defaults: {
                    ...deptData
                }
            });
            createdDepts[deptName] = dept;
        }

        // Créer les utilisateurs
        for (const userData of users) {
            const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
            const roleName = userRoles[userData.email];
            const deptName = userDepartments[userData.email];
            
            await User.findOrCreate({
                where: { email: userData.email },
                defaults: {
                    ...userData,
                    mot_de_passe: hashedPassword,
                    id_role: createdRoles[roleName].id_role,
                    id_departement: createdDepts[deptName].id_departement
                }
            });
        }

        console.log('Utilisateurs initialisés avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des utilisateurs:', error);
        process.exit(1);
    }
}

initUsers();
