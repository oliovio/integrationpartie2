# Gestion des Équipements - Backend

## Description
API backend pour la gestion des équipements informatiques, utilisateurs, départements et maintenance.

## Prérequis
- Node.js (v14 ou supérieur)
- MySQL (v8 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le projet
```bash
git clone [url-du-projet]
cd Backend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'environnement
- Copier le fichier `.env.example` vers `.env`
- Modifier les variables dans `.env` selon votre environnement

4. Créer la base de données
```sql
CREATE DATABASE gestion_equipements;
```

5. Démarrer le serveur
```bash
npm run dev
```

## Structure du Projet

```
Backend/
├── config/             # Configuration (base de données, constantes)
├── controllers/        # Logique métier
├── middleware/         # Middleware (auth, validation, etc.)
├── models/            # Modèles Sequelize
├── routes/            # Routes API
├── validations/       # Règles de validation
└── index.js           # Point d'entrée
```

## Routes API

### Authentification
- POST `/api/auth/register` - Inscription
- POST `/api/auth/login` - Connexion

### Utilisateurs
- GET `/api/users` - Liste des utilisateurs
- GET `/api/users/:id` - Détails d'un utilisateur
- POST `/api/users` - Créer un utilisateur
- PUT `/api/users/:id` - Modifier un utilisateur
- DELETE `/api/users/:id` - Supprimer un utilisateur

### Équipements
- GET `/api/equipements` - Liste des équipements
- GET `/api/equipements/:id` - Détails d'un équipement
- POST `/api/equipements` - Ajouter un équipement
- PUT `/api/equipements/:id` - Modifier un équipement
- DELETE `/api/equipements/:id` - Supprimer un équipement

### Départements
- GET `/api/departments` - Liste des départements
- GET `/api/departments/:id` - Détails d'un département
- POST `/api/departments` - Créer un département
- PUT `/api/departments/:id` - Modifier un département
- DELETE `/api/departments/:id` - Supprimer un département

### Maintenance
- GET `/api/maintenance` - Historique de maintenance
- GET `/api/maintenance/:id` - Détails d'une maintenance
- POST `/api/maintenance` - Ajouter une maintenance
- PUT `/api/maintenance/:id` - Modifier une maintenance
- DELETE `/api/maintenance/:id` - Supprimer une maintenance

### Rôles
- GET `/api/roles` - Liste des rôles
- GET `/api/roles/:id` - Détails d'un rôle
- POST `/api/roles` - Créer un rôle
- PUT `/api/roles/:id` - Modifier un rôle
- DELETE `/api/roles/:id` - Supprimer un rôle

## Sécurité
- Authentification par JWT
- Validation des données entrantes
- Gestion des rôles et permissions
- Protection CORS
- Hachage des mots de passe

## Scripts npm
- `npm run dev` - Démarrer en mode développement
- `npm start` - Démarrer en mode production
- `npm test` - Exécuter les tests
