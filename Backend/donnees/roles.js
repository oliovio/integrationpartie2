export const roles = [
    {
        "id": 1,
        "nom": "Administrateur",
        "description": "Accès complet au système",
        "permissions": ["lecture", "ecriture", "suppression", "administration"]
    },
    {
        "id": 2,
        "nom": "Gestionnaire",
        "description": "Gestion des équipements et utilisateurs",
        "permissions": ["lecture", "ecriture"]
    },
    {
        "id": 3,
        "nom": "Technicien",
        "description": "Maintenance des équipements",
        "permissions": ["lecture", "maintenance"]
    },
    {
        "id": 4,
        "nom": "Support",
        "description": "Support utilisateur",
        "permissions": ["lecture"]
    }
];
