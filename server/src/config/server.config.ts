import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import fastify, { FastifyInstance } from 'fastify';
import helmet from 'fastify-helmet';
import mercurius from 'mercurius';
import cors from 'fastify-cors';

import {
  errorController,
  handlerErrors,
  notFoundController,
} from '@utils/handler.errors';

import authServices from '@services/auth.services';

import permissions from '@graphql/permissions';
import resolvers from '@graphql/resolvers';
import schema from '@graphql/schema';

import { GrahpqlCtx } from '@interfaces';

import { initConn } from './db.config';

/**
 * Clase que inicializa el servidor
 */
export class App {
  private app: FastifyInstance;
  private port: number;

  /**
   * Constructor para incializar la instancia de fastify, el puerto, y las demás
   * configuraciones
   * @param {number} port puerto en el que va a escuchar el servidor
   */
  constructor(port?: number) {
    this.app = fastify({
      logger: process.env.NODE_ENV !== 'production',
      trustProxy: process.env.NODE_ENV === 'production',
    });
    this.port = port || parseInt(process.env.PORT!);

    this.middlewares();
    this.handlers();
  }

  /**
   * Middlewares de la aplicación
   */
  private middlewares() {
    this.app.register(cors, {
      methods: ['POST', 'PUT', 'DELETE', 'OPTIONS'],
      optionsSuccessStatus: 204,
    });

    this.app.register(mercurius, {
      schema: applyMiddleware(
        makeExecutableSchema({
          typeDefs: schema,
          resolvers,
        }),
        permissions,
      ),
      graphiql: process.env.NODE_ENV !== 'production',
      context: (req): GrahpqlCtx => ({
        user: authServices.authToken(req.headers['x-auth-token'] as string),
      }),
    });

    if (process.env.NODE_ENV === 'production') this.app.register(helmet);
    else
      this.app.get('/', ({}, reply) => {
        reply.send('');
      });
  }

  /**
   * Handlers de la aplicación
   */
  public handlers() {
    this.app.setErrorHandler(errorController);
    this.app.setNotFoundHandler(notFoundController);
  }

  /**
   * Función para poner a escuchar al servidor en el puerto antes indicado y
   * además, inicializar la conexión con mongodb
   */
  public async listen() {
    try {
      await initConn();
      await this.app.listen(this.port, '0.0.0.0');
    } catch (e) {
      handlerErrors(e, true);
    }
  }
}
