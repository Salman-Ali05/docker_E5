const express = require('express');
const router = express.Router();
const controller = require('../controller/reservation.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations de salles
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get('/', verifyToken, controller.getAllReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Obtenir une réservation par ID
 *     tags: [Reservations]
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
 *         description: Détails de la réservation
 */
router.get('/:id', verifyToken, controller.getReservationById);

router.use(verifyToken, authorizeRoles('admin'));

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - room
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               user:
 *                 type: string
 *               room:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 example: "14:00"
 *               endTime:
 *                 type: string
 *                 example: "15:00"
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.post('/', controller.createReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Reservations]
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
 *               user:
 *                 type: string
 *               room:
 *                 type: string
 *               date:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 */
router.put('/:id', controller.updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
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
 *         description: Réservation supprimée
 */
router.delete('/:id', controller.deleteReservation);

module.exports = router;
