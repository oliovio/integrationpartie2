import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize } from '../config/dataBase.js';

class AuthController {
  static async register(req, res) {
    try {
      const { nom, email, password, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const [existingUsers] = await pool.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel utilisateur
      const [result] = await pool.query(
        'INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)',
        [nom, email, hashedPassword, role]
      );

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        userId: result.insertId
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Rechercher l'utilisateur
      const [users] = await pool.query(
        'SELECT * FROM utilisateurs WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const user = users[0];

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Générer le token JWT
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          nom: user.nom,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  }
}

export default AuthController;