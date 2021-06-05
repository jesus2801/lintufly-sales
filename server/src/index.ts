process.env.NODE_ENV = 'dev';

import './config/env.config';

import { App } from './config/server.config';

const main = async () => {
  const app = new App();
  await app.listen();
};

main();
