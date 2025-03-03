import { body, param } from "express-validator";

// Regex pour la validation du nom et prénom
const nameRegex = /^[a-zA-Z]{4,}$/; // Permet uniquement des lettres, avec un minimum de 4 caractères

// Regex pour la validation du mot de passe (au moins 8 caractères, 1 chiffre, 1 lettre minuscule, 1 majuscule, 1 caractère spécial)
const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

// Règles de validation pour les utilisateurs
const userRules = [
    body('nom')
        .matches(nameRegex).withMessage("Le nom n'est pas conforme (minimum 4 lettres)"),
    
    body('prenom')
        .matches(nameRegex).withMessage("Le prénom n'est pas conforme (minimum 4 lettres)"),

    // Validation de l'email : vérification de la présence et du format
    body('email')
        .exists().withMessage('L\'email est obligatoire')
        .isEmail().withMessage('L\'email doit être valide'),

    // Validation du mot de passe avec les règles spécifiées dans le regex
    body('mot_de_passe')
        .isString().withMessage('Le mot de passe doit être une chaîne de caractères')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
        .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
        .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
        .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),

    // Validation de la date de naissance : doit être une date valide au format ISO
    body('date_de_naissance')
        .isISO8601().withMessage('La date de naissance est incorrecte'),

    // Validation de l'ID du département (optionnel, entier positif)
    body('DepartmentId')
        .optional().isInt({ min: 1 }).withMessage('L\'ID du département doit être un entier positif'),

    // Validation de l'ID passé en paramètre (optionnel, entier positif)
    param('id')
        .optional().isInt({ min: 1 }).withMessage('L\'ID doit être un entier positif')
];

export default userRules;
