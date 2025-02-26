// Importer le modèle User
import { User } from '../models/Relation.js';

const autoriser = (roles) => async (req, res, next) => {
  // Récupérer l'id de l'utilisateur à partir de la requête (prévu pour un middleware d'authentification)
  const id = req.userId;

  try {
    // Chercher l'utilisateur dans la base de données par son ID
    const user = await User.findByPk(id);

    // Si l'utilisateur n'existe pas, retourner une erreur 404
    if (!user) {
      return res.status(404).json({ message: "Cet utilisateur n'existe pas!" });
    }

    // Récupérer les rôles de l'utilisateur
    const userRoles = await user.getRoles();

    // Si l'utilisateur n'a pas de rôles, retourner une erreur 403
    if (!userRoles.length) {
      return res.status(403).json({ message: "Vous n'avez pas les droits nécessaires" });
    }

    // Convertir les titres des rôles de l'utilisateur en minuscules
    const userRoleTitles = userRoles.map(role => role.titre.toLowerCase());

    // Vérifier si l'utilisateur a l'un des rôles requis
    const hasRole = roles.some(role => userRoleTitles.includes(role.toLowerCase()));

    // Si l'utilisateur a le rôle nécessaire, passer à la suite
    if (hasRole) {
      return next();
    } else {
      // Sinon, refuser l'accès avec une erreur 403
      return res.status(403).json({ message: "Vous n'avez pas les autorisations requises pour cette action" });
    }
  } catch (error) {
    // En cas d'erreur, retourner une erreur 500
    return res.status(500).json({ message: `Erreur lors de la vérification des autorisations: ${error.message}` });
  }
};

export default autoriser;
