import cluster from 'cluster';
import { cpus } from 'os';
const cpusLength = cpus().length;

//seteo el entorno actual de la aplicación
process.env.NODE_ENV = 'dev';

//import la configuración de los .env
import '@config/env.config';

import { logger } from '@config/logger.config';
import Master from '@config/clusters.config';
import { App } from '@config/server.config';

//función que inicializa el servidor
const main = async () => {
  if (process.env.NODE_ENV === 'dev') {
    const app = new App();
    return app.listen();
  }

  //si estamos con el mastes, levantamos lo workes
  if (cluster.isMaster && cpusLength > 1) {
    const master = new Master({ cluster: cluster });

    //levantamos un worker por cada cpu
    for (let i = 0; i < cpusLength; i++) {
      master.levantarWorker();
    }

    cluster.on('exit', (worker) => {
      logger.error(`Cluster number: ${worker.id} is dead`);

      // levantamos un nuevo worker cuando uno muere
      master.levantarWorkerMuerto();
    });

    //si no estamos con el master, levantamos la aplicación
  } else {
    const app = new App();
    return app.listen();
  }
};

main();
