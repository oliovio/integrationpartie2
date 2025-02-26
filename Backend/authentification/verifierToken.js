// Importation du module jwt
import jwt from 'jsonwebtoken';

export const verifierToken = (req, res, next) => {
    try {
        // Récupérer le token depuis les headers d'autorisation
        const bearerToken = req.headers.authorization;

        // Vérification de la présence du token
        if (!bearerToken) {
            return res.status(401).json({ message: "Vous n'êtes pas connecté !" });
        }

        // Extraire le token en retirant la partie "Bearer"
        const token = bearerToken.split(' ')[1];

        // Vérification de la validité du token
        jwt.verify(token, process.env.CODE_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({ message: "Token invalide ou expiré" });
            }

            // Ajouter l'ID de l'utilisateur à la requête pour utilisation dans les prochains middlewares
            req.userId = payload.id;

            // Passer au middleware suivant
            next();
        });
    } catch (error) {
        // Gestion des erreurs, en cas de problème avec la vérification
        res.status(500).json({ message: "Erreur lors de la vérification du token : " + error.message });
    }
};
