import { Role } from '../models/index.js';
import sequelize from '../config/database.js';

const roles = [
    {
        nom: "Administrateur",
        description: "Accès complet au système",
        permissions: ["ADMIN", "GESTION_UTILISATEURS", "GESTION_EQUIPEMENTS", "GESTION_MAINTENANCE"]
    },
    {
        nom: "Gestionnaire",
        description: "Gestion des équipements et utilisateurs",
        permissions: ["GESTION_EQUIPEMENTS", "GESTION_MAINTENANCE"]
    },
    {
        nom: "Technicien",
        description: "Maintenance des équipements",
        permissions: ["GESTION_MAINTENANCE"]
    },
    {
        nom: "Utilisateur",
        description: "Accès en lecture seule",
        permissions: ["LECTURE_SEULE"]
    }
];

async function initRoles() {
    try {
        await sequelize.sync();
        
        for (const roleData of roles) {
            await Role.findOrCreate({
                where: { nom: roleData.nom },
                defaults: roleData
            });
        }
        
        console.log('Rôles initialisés avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des rôles:', error);
        process.exit(1);
    }
}

initRoles();
