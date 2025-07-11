const express = require('express');
const app = express();

const userRoutes = require('./routes/user.route');
const notificationRoutes = require('./routes/notification.route');
const reservationRoutes = require('./routes/reservation.route');
const roomRoutes = require('./routes/room.route');
const roleRoutes = require('./routes/role.route');
const invitationRoutes = require('./routes/invitation.route');
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

// Middlewares
app.use(express.json());

// Route de welcome
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur Eduresa API',
        docs: '/api/docs',
    });
});

// Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/invitations', invitationRoutes);

module.exports = app;
