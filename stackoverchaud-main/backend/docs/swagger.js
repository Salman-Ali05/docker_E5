const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StackOverChaud API',
      version: '1.0.0',
      description: 'Documentation de l\'API de gestion des utilisateurs, réservations, salles et notifications'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Serveur local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'] // Assure-toi que les commentaires JSDoc sont bien dans ces fichiers
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
