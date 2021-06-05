//seteo el entorno actual de la aplicación
process.env.NODE_ENV = 'dev';

//import la configuración de los .env
import './config/env.config';

import { App } from './config/server.config';

//función que inicializa el servidor
const main = async () => {
  const app = new App();
  await app.listen();
};

main();
