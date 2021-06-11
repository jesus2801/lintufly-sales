import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

import { rollbar } from '@config/rollbar.config';
import { logger } from '@config/logger.config';

//Loguear errores desconocidos
const logUnknownErr = (e: any) => {
  logger.error(
    typeof e === 'object' ? (Object.keys(e).length === 0 ? e : JSON.stringify(e)) : e,
  );
};

export const handlerErrors = (e: any, unhandledErr?: boolean): void => {
  console.log('entrandooooo');
  //si el error es de tipo `Error` entonces lo reportamos a rollbar y lo logueamos
  if (e instanceof Error) {
    rollbar.error(e);
    logger.error(
      `message: ${e.message} \n Name: ${e.name} \n Stack: ${
        e.stack
      } \n json: ${JSON.stringify(e)}`,
    );
    return;
  }

  //si el error de de sintaxis de tipado o desconocido reinicio el servidor y lo reporto a rollbar
  if (e instanceof SyntaxError || e instanceof TypeError || unhandledErr) {
    rollbar.critical(e);
    logUnknownErr(e);
    process.exit(1);
  }

  //Si el error no es de sintaxis o tipado, ni desconocido, ni de tipo `Error`
  //entonces lo reporto a rollbar y lo logueo
  rollbar.error(e);
  logUnknownErr(e);
};

//controlador para manejar los errores de fastify
export const errorController = (
  e: FastifyError,
  {}: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    //enviar el error al manejador de errores
    handlerErrors(e);

    //responder con un status de 500, indicando un error interno
    return reply.status(500).send({ error: 'Internal error' });
  } catch (e) {
    //si hay algún error, enviarlo al manejador de errores
    handlerErrors(e);
  }
};

// controlador para las rutas no encontradas
export const notFoundController = (req: FastifyRequest, reply: FastifyReply) =>
  reply.status(404).send('Not Found');

// Clase de errores dentro de los servicios
export class ServiceError {
  //código que representa el error
  public code: string;

  constructor(code: string) {
    //asignamos el código
    this.code = code;
  }
}
