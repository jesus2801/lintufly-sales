import jwt from 'jsonwebtoken';

import { UserPayload } from '@interfaces';

import config from '@config';

/**
 * Clase de servicios de autenticación
 */
class AuthServices {
  public authToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, config.server.secret) as UserPayload;
    } catch {
      return null;
    }
  }
}

export default new AuthServices();
