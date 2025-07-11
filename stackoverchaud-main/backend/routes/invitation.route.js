const express = require('express');
const router = express.Router();
const controller = require('../controller/invitation.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

router.use(verifyToken);
router.use(authorizeRoles('admin'));
/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Gestion des invitations d'inscription
 */

/**
 * @swagger
 * /invitations:
 *   get:
 *     summary: Récupérer toutes les invitations
 *     tags: [Invitations]
 *     responses:
 *       200:
 *         description: Liste des invitations
 */

/**
 * @swagger
 * /invitations/{id}:
 *   get:
 *     summary: Obtenir une invitation par ID
 *     tags: [Invitations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'invitation
 */

/**
 * @swagger
 * /invitations:
 *   post:
 *     summary: Créer une nouvelle invitation
 *     tags: [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invitation créée
 */

/**
 * @swagger
 * /invitations/{id}:
 *   delete:
 *     summary: Supprimer une invitation
 *     tags: [Invitations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation supprimée
 */

router.post('/', controller.createInvitation);
router.get('/', controller.getAllInvitations);
router.get('/:id', controller.getInvitationById);
router.delete('/:id', controller.deleteInvitation);

module.exports = router;
