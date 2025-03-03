import { body } from "express-validator";

const loginRules = [
    // Validation de l'email
    body('email')
        .notEmpty().withMessage("L'email est requis")
        .isEmail().withMessage("L'email doit être valide")
        .normalizeEmail(),

    // Validation du mot de passe
    body('mot_de_passe')
        .notEmpty().withMessage("Le mot de passe est requis")
        .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
];

export default loginRules;
