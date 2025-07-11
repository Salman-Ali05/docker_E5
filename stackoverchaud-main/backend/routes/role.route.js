const express = require('express');
const router = express.Router();
const controller = require('../controller/role.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestion des rôles utilisateurs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des rôles
 */
router.get('/', controller.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtenir un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du rôle
 */
router.get('/:id', controller.getRoleById);

router.use(verifyToken, authorizeRoles("admin"));

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Créer un nouveau rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rôle créé
 */
router.post('/', controller.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Modifier un rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 */
router.put('/:id', controller.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Supprimer un rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rôle supprimé
 */
router.delete('/:id', controller.deleteRole);

module.exports = router;
