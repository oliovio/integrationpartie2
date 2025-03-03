import express from 'express';
import { Role } from '../../../models/index.js';
import { authenticate } from '../../../middleware/auth.js';

const router = express.Router();

// GET /api/roles - Récupérer tous les rôles
router.get('/', authenticate, async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
        res.status(500).json({ message: "Erreur lors de la récupération des rôles" });
    }
});

// GET /api/roles/:id - Récupérer un rôle spécifique
router.get('/:id', authenticate, async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        res.json(role);
    } catch (error) {
        console.error('Erreur lors de la récupération du rôle:', error);
        res.status(500).json({ message: "Erreur lors de la récupération du rôle" });
    }
});

// POST /api/roles - Créer un nouveau rôle (admin seulement)
router.post('/', authenticate, async (req, res) => {
    if (req.user.role !== 'Administrateur') {
        return res.status(403).json({ message: "Accès non autorisé" });
    }

    try {
        const role = await Role.create(req.body);
        res.status(201).json(role);
    } catch (error) {
        console.error('Erreur lors de la création du rôle:', error);
        res.status(500).json({ message: "Erreur lors de la création du rôle" });
    }
});

// PUT /api/roles/:id - Modifier un rôle (admin seulement)
router.put('/:id', authenticate, async (req, res) => {
    if (req.user.role !== 'Administrateur') {
        return res.status(403).json({ message: "Accès non autorisé" });
    }

    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        await role.update(req.body);
        res.json(role);
    } catch (error) {
        console.error('Erreur lors de la modification du rôle:', error);
        res.status(500).json({ message: "Erreur lors de la modification du rôle" });
    }
});

// DELETE /api/roles/:id - Supprimer un rôle (admin seulement)
router.delete('/:id', authenticate, async (req, res) => {
    if (req.user.role !== 'Administrateur') {
        return res.status(403).json({ message: "Accès non autorisé" });
    }

    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Rôle non trouvé" });
        }
        await role.destroy();
        res.json({ message: "Rôle supprimé avec succès" });
    } catch (error) {
        console.error('Erreur lors de la suppression du rôle:', error);
        res.status(500).json({ message: "Erreur lors de la suppression du rôle" });
    }
});

export default router;
