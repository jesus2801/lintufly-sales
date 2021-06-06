import { logger } from '@config/logger.config';
import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export const handlerErrors = (e: any, unknowError?: boolean): void => {
  //si es un objeto que no está vacio lo imprimo como json, sino entonces imprimo tal cual
  //el error
  logger.error(
    typeof e === 'object' ? (Object.keys(e).length === 0 ? e : JSON.stringify(e)) : e,
  );

  if (process.env.NODE_ENV === 'dev') return;

  //si el error de de sintaxis de tipado o desconocido reinicio el servidor
  if (e instanceof SyntaxError || e instanceof TypeError || unknowError) {
    process.exit(1);
  }
};

export const errorController = (e: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
  try {
    handlerErrors(e);

    return reply.status(500).send({ error: 'Internal error' });
  } catch (e) {
    handlerErrors(e);
  }
};
