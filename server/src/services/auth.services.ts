import jwt from 'jsonwebtoken';

import { UserPayload } from '@interfaces';

import config from '@config';

/**
 * Clase de servicios de autenticación
 */
class AuthServices {
  /**
   * Servicio para autenticar el token del usuario
   * @param {string} token token del usuario
   * @returns {null|UserPayload}
   */
  public authToken(token: string): UserPayload | null {
    try {
      return jwt.verify(token, config.server.secret) as UserPayload;
    } catch {
      return null;
    }
  }
}

export default new AuthServices();
