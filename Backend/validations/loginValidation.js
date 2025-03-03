import { body } from "express-validator";

const loginRules = [
    // Validation de l'email : obligatoire et au format valide
    body('email')
        .exists().withMessage('L\'email est obligatoire')
        .isEmail().withMessage('L\'email doit être valide'),

    // Validation du mot de passe : 
    // Il doit être une chaîne de caractères, avoir au moins 8 caractères, 
    // inclure au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial
    body('mot_de_passe')
        .isString().withMessage('Le mot de passe doit être une chaîne de caractères')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial')
];

export default loginRules;
