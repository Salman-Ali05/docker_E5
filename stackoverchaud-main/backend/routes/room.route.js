/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Gestion des salles
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Liste de toutes les salles
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Succès
 */

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Obtenir une salle par ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la salle
 *       404:
 *         description: Salle non trouvée
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Créer une nouvelle salle
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *               type:
 *                 type: string
 *               reserved:
 *                 type: boolean
 *               floor:
 *                 type: number
 *     responses:
 *       201:
 *         description: Salle créée
 *       400:
 *         description: Données invalides
 */

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Modifier une salle
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Salle mise à jour
 */

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Supprimer une salle
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salle supprimée
 */

const express = require('express');
const router = express.Router();
const controller = require('../controller/room.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);
router.get('/', controller.getAllRooms);

router.get('/:id', controller.getRoomById);
router.post('/', controller.createRoom);
router.put('/:id', controller.updateRoom);
router.delete('/:id', controller.deleteRoom);

module.exports = router;
