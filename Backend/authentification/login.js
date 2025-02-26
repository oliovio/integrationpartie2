import { User } from "../models/Relation.js";
import bcrypt from 'bcryptjs'; // Module de hachage pour la vérification du mot de passe
import jwt from 'jsonwebtoken'; // Module pour la génération du jeton
import { validationResult } from "express-validator"; // Validation des entrées utilisateur

export const login = async (req, res) => {
    // Récupération des erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuration des informations de connexion depuis la requête
    const { email, mot_de_passe } = req.body;

    // Validation de l'email avec une expression régulière
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "L'email est incorrect" });
    }

    try {
        // Chercher l'utilisateur dans la base de données par son email
        const user = await User.findOne({ where: { email } });

        // Vérifier si l'utilisateur existe dans la base de données
        if (!user) {
            return res.status(404).json({ message: "Cet utilisateur n'existe pas!" });
        }

        // Vérification du mot de passe
        const mdpCorrect = bcrypt.compareSync(mot_de_passe, user.mot_de_passe);
        if (!mdpCorrect) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Création du payload du jeton d'authentification (JWT)
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.CODE_SECRET, { expiresIn: '1h' });

        // Retourner la réponse avec le token et les informations de l'utilisateur
        res.status(200).json({
            message: "Connexion réussie",
            data: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom
            },
            token
        });
    } catch (error) {
        // En cas d'erreur serveur
        res.status(500).json({ message: "Erreur lors de la connexion: " + error.message });
    }
};
