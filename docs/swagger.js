const swaggerJsdoc = require('swagger-jsdoc');

const options = {
        definition: {
                openapi: '3.0.0',
                info: {
                        title: 'API Port de Plaisance Russel',
                        version: '1.0.0',
                        description: "Documentation de l'API privée de gestion des utilisateurs, catways et réservations."
                },
                servers: [
                        {
                                url: 'http://localhost:3000',
                                description: 'Serveur local'
                        }
                ]
        },
        apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;