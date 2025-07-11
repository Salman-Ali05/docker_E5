const express = require('express');
const router = express.Router();
const controller = require('../controller/notification.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gestion des notifications
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Récupérer toutes les notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
 */
router.get('/', verifyToken, controller.getAllNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Obtenir une notification par ID
 *     tags: [Notifications]
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
 *         description: Détails de la notification
 */
router.get('/:id', verifyToken, controller.getNotificationById);

router.use(verifyToken, authorizeRoles('admin'));

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Créer une notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user, content]
 *             properties:
 *               user:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [lu, non_lu]
 *               type:
 *                 type: string
 *                 enum: [info, alerte, reservation]
 *     responses:
 *       201:
 *         description: Notification créée
 */
router.post('/', controller.createNotification);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Supprimer une notification
 *     tags: [Notifications]
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
 *         description: Notification supprimée
 */
router.delete('/:id', controller.deleteNotification);

module.exports = router;
