import fastify, { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import helmet from 'fastify-helmet';

import resolvers from '@graphql/resolvers';
import { initConn } from './db.config';
import schema from '@graphql/schema';

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
      // logger: true,
      trustProxy: process.env.NODE_ENV === 'production',
    });
    this.port = port || parseInt(process.env.PORT!);

    this.middlewares();
  }

  /**
   * Middlewares de la aplicación
   */
  private middlewares() {
    this.app.register(mercurius, {
      schema: schema,
      resolvers,
      graphiql: process.env.NODE_ENV !== 'production',
    });
    if (process.env.NODE_ENV === 'production') {
      this.app.register(helmet);
    } else {
      this.app.get('/', (req, reply) => {
        reply.send('');
      });
    }
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
      this.app.log.error(e);
      process.exit(1);
    }
  }
}
