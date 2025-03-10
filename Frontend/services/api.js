
const API_URL = 'http://localhost:5000/api';

// Fonction pour récupérer l'en-tête d'authentification avec le token
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Test de la connexion API
export const testConnection = async () => {
    try {
        const response = await fetch(`${API_URL}/test`, {
            headers: {
                ...getAuthHeader() // Ajout de l'en-tête d'authentification si disponible
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Connection Error:', error);
        throw error;
    }
};

// Module d'authentification
export const auth = {
    // Fonction pour se connecter (login)
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials) // On envoie les données de connexion (username et password)
            });
            const data = await response.json();
            if (data.token) {
                // Si un token est retourné, on le stocke dans le localStorage
                localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    },

    // Fonction pour se déconnecter (logout)
    logout: () => {
        // Supprime le token du localStorage pour déconnecter l'utilisateur
        localStorage.removeItem('token');
    }
};

// Module pour gérer les équipements
export const equipment = {
    // Récupérer tous les équipements
    getAll: async () => {
        try {
            const response = await fetch(`${API_URL}/equipment`, {
                headers: {
                    ...getAuthHeader() // Ajout de l'en-tête d'authentification pour accéder aux équipements protégés
                }
            });
            return await response.json(); // Retourne les équipements au format JSON
        } catch (error) {
            console.error('Get Equipment Error:', error);
            throw error;
        }
    },

    // Créer un nouvel équipement
    create: async (equipmentData) => {
        try {
            const response = await fetch(`${API_URL}/equipment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indique que l'on envoie des données JSON
                    ...getAuthHeader() // Ajout de l'en-tête d'authentification
                },
                body: JSON.stringify(equipmentData) // On envoie les données de l'équipement
            });
            return await response.json(); // Retourne l'équipement créé
        } catch (error) {
            console.error('Create Equipment Error:', error);
            throw error;
        }
    }
};
