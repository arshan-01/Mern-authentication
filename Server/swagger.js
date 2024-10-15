import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER_STAGE_URL } from './src/config/env.config.js';

// Define your custom client URL
// const CUSTOM_CLIENT_URL = 'http://localhost:8080'; // SWAGGER DEFAULT UI URL

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication API with Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${SWAGGER_STAGE_URL}/api/v1`, // Main API URL
      },
      // {
      //   url: SWAGGER_STAGE_URL, // Custom client URL
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken', // Adjust based on your cookie name
        },
      },
    },
    security: [
      {
        bearerAuth: [],
        cookieAuth: [], // Apply the cookie authentication globally
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Adjust path if necessary
};

const spec = swaggerJSDoc(options);

const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(spec);

export { swaggerServe, swaggerSetup };
