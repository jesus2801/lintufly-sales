import dotenv from 'dotenv';
import path from 'path';

switch (process.env.NODE_ENV) {
  case 'production':
    dotenv.config({ path: path.resolve(__dirname, '../../.env.production') });

  case 'dev':
  case 'development':
  default:
    dotenv.config({ path: path.resolve(__dirname, '../../.env.development') });
    break;
}
