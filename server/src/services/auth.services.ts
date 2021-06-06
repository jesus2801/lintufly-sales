import config from '@config';
import { UserPayload } from '@interfaces';
import jwt from 'jsonwebtoken';

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
