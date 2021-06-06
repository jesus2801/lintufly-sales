import { connect } from 'mongoose';
import config from '.';
import { logger } from './logger.config';

/**
 * Función para iniciar la conexión con MongoDB
 * @category MongoDB
 */
export const initConn = async () => {
  try {
    //me conecto a mongo por medio de la uri predefinida en los .env
    await connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    logger.info('MongoDB is conected');
  } catch (e) {
    // si hay un error lo logueo y me salgo
    // logger.err(e)
    process.exit(1);
  }
};
