import 'reflect-metadata';
import * as winston from 'winston';
import { InversifyExpressServer } from 'inversify-express-utils';
import { mainContainer } from './modules';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import { MiddlewareConfig } from './shared/middlewares/middlewareConfig';
import * as swagger from 'swagger-express-ts';

import { CONFIG } from './config';
import { errorMiddleware } from './shared/middlewares/error.middleware';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';
import { Redis } from './shared/utils/redis';
/** Load Envrionment Variables form .env file */
config();

/** Server */
const server = new InversifyExpressServer(mainContainer);
server
  .setErrorConfig(app => {
    app.use(errorMiddleware);
  })
  .setConfig(app => {
    app.use('/api-docs', express.static('packages/server/swagger'));
    app.use(bodyParser.json());
    MiddlewareConfig.init(app);
    app.use(
      swagger.express({
        definition: {
          info: {
            title: 'BigStepTech API',
            version: '1.0',
          },
          externalDocs: {
            url: 'https://localhost:3001',
          },
          schemes: ['http', 'https'],
          securityDefinitions: {
            apiKeyHeader: {
              type: SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: SwaggerDefinitionConstant.Security.In.HEADER,
              name: 'Authorization',
            },
          },
          // Models can be defined here
        },
      })
    );
  });

//initialize redis
export const redis = new Redis();

const app = server.build();

app
  .listen(CONFIG.PORT, () =>
    console.log(`The server is running on http://localhost:${CONFIG.PORT}`)
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(error);
    }
  });
process.on('beforeExit', function (err) {
  winston.error(JSON.stringify(err));
  console.error(err);
});

process.on('SIGINT', async () => {
  await redis.quit();
  console.log('Received SIGINT signal');
});

process.on('SIGTERM', async () => {
  await redis.quit();
  console.log('Received SIGTERM signal');
});
