import { User, Role, Department, Equipement, Maintenance, Categorie } from '../models/index.js';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

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
    "IT": { description: "Département informatique" },
    "Support": { description: "Département support" },
    "Maintenance": { description: "Département maintenance" },
    "Développement": { description: "Département développement" },
    "Réseau": { description: "Département réseau" }
};

const users = [
    {
        nom: "Dubois",
        prenom: "Marie",
        email: "marie.dubois@entreprise.com",
        mot_de_passe: "Admin123!",
        telephone: "514-555-0001",
        date_embauche: "2024-01-15",
        role: "Administrateur",
        departement: "IT",
        actif: true
    },
    {
        nom: "Martin",
        prenom: "Paul",
        email: "paul.martin@entreprise.com",
        mot_de_passe: "Gestionnaire123!",
        telephone: "514-555-0002",
        date_embauche: "2024-02-01",
        role: "Gestionnaire",
        departement: "Support",
        actif: true
    },
    {
        nom: "Lambert",
        prenom: "Sophie",
        email: "sophie.lambert@entreprise.com",
        mot_de_passe: "Tech123!",
        telephone: "514-555-0003",
        date_embauche: "2024-02-15",
        role: "Technicien",
        departement: "Maintenance",
        actif: true
    }
];

const categories = [
    { nom: "Ordinateurs", description: "Postes de travail et ordinateurs portables" },
    { nom: "Serveurs", description: "Serveurs physiques et virtuels" },
    { nom: "Réseau", description: "Équipements réseau (routeurs, switches, etc.)" },
    { nom: "Périphériques", description: "Imprimantes, scanners, etc." },
    { nom: "Logiciels", description: "Licences et logiciels" }
];

const equipements = [
    {
        nom: "Serveur Principal",
        numero_serie: "SRV-2024-001",
        description: "Serveur Dell PowerEdge R740",
        date_acquisition: "2024-01-01",
        date_mise_service: "2024-01-15",
        etat: "En service",
        notes: "Serveur principal de l'entreprise",
        categorie: "Serveurs",
        departement: "IT"
    },
    {
        nom: "Switch Core",
        numero_serie: "NET-2024-001",
        description: "Cisco Catalyst 9300",
        date_acquisition: "2024-01-05",
        date_mise_service: "2024-01-20",
        etat: "En service",
        notes: "Switch principal",
        categorie: "Réseau",
        departement: "Réseau"
    },
    {
        nom: "Poste Dev 1",
        numero_serie: "PC-2024-001",
        description: "Dell Precision 5570",
        date_acquisition: "2024-02-01",
        date_mise_service: "2024-02-15",
        etat: "En service",
        notes: "Poste développeur senior",
        categorie: "Ordinateurs",
        departement: "Développement"
    }
];

const maintenances = [
    {
        type: "Préventive",
        description: "Maintenance mensuelle serveur",
        date_prevue: "2024-03-15",
        priorite: "Normal",
        statut: "Planifié",
        equipement: "Serveur Principal",
        technicien: "sophie.lambert@entreprise.com"
    },
    {
        type: "Préventive",
        description: "Vérification switch core",
        date_prevue: "2024-03-20",
        priorite: "Normal",
        statut: "Planifié",
        equipement: "Switch Core",
        technicien: "sophie.lambert@entreprise.com"
    }
];

async function initAll() {
    try {
        await sequelize.sync({ force: true }); // Attention: ceci va supprimer toutes les données existantes

        // Créer les rôles
        const createdRoles = {};
        for (const [roleName, roleData] of Object.entries(roles)) {
            const [role] = await Role.findOrCreate({
                where: { nom: roleName },
                defaults: roleData
            });
            createdRoles[roleName] = role;
        }
        console.log('✓ Rôles créés');

        // Créer les départements
        const createdDepts = {};
        for (const [deptName, deptData] of Object.entries(departments)) {
            const [dept] = await Department.findOrCreate({
                where: { nom: deptName },
                defaults: deptData
            });
            createdDepts[deptName] = dept;
        }
        console.log('✓ Départements créés');

        // Créer les utilisateurs
        const createdUsers = {};
        for (const userData of users) {
            const hashedPassword = await bcrypt.hash(userData.mot_de_passe, 10);
            const [user] = await User.findOrCreate({
                where: { email: userData.email },
                defaults: {
                    ...userData,
                    mot_de_passe: hashedPassword,
                    id_role: createdRoles[userData.role].id_role,
                    id_departement: createdDepts[userData.departement].id_departement
                }
            });
            createdUsers[userData.email] = user;
        }
        console.log('✓ Utilisateurs créés');

        // Créer les catégories
        const createdCategories = {};
        for (const catData of categories) {
            const [cat] = await Categorie.findOrCreate({
                where: { nom: catData.nom },
                defaults: catData
            });
            createdCategories[catData.nom] = cat;
        }
        console.log('✓ Catégories créées');

        // Créer les équipements
        const createdEquipements = {};
        for (const equipData of equipements) {
            const [equip] = await Equipement.findOrCreate({
                where: { numero_serie: equipData.numero_serie },
                defaults: {
                    ...equipData,
                    id_categorie: createdCategories[equipData.categorie].id_categorie,
                    id_departement: createdDepts[equipData.departement].id_departement
                }
            });
            createdEquipements[equipData.nom] = equip;
        }
        console.log('✓ Équipements créés');

        // Créer les maintenances
        for (const maintData of maintenances) {
            await Maintenance.findOrCreate({
                where: {
                    id_equipement: createdEquipements[maintData.equipement].id_equipement,
                    date_prevue: maintData.date_prevue
                },
                defaults: {
                    ...maintData,
                    id_equipement: createdEquipements[maintData.equipement].id_equipement,
                    id_technicien: createdUsers[maintData.technicien].id_utilisateur
                }
            });
        }
        console.log('✓ Maintenances créées');

        console.log('✓ Initialisation terminée avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        process.exit(1);
    }
}

initAll();
