import fastify, { FastifyInstance } from 'fastify';
import mercurius from 'mercurius';
import helmet from 'fastify-helmet';

import resolvers from '../schema/resolvers';
import { initConn } from './db.config';
import schema from '../schema/schema';

export class App {
  private app: FastifyInstance;
  private port: number;

  constructor(port?: number) {
    this.app = fastify({
      logger: true,
      trustProxy: process.env.NODE_ENV === 'production',
    });
    this.port = port || parseInt(process.env.PORT!);

    this.middlewares();
  }

  private middlewares() {
    this.app.register(mercurius, {
      schema: schema,
      resolvers,
      graphiql: true,
    });
    if (process.env.NODE_ENV === 'production') {
      this.app.register(helmet);
    }
  }

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
