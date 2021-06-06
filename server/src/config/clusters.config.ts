import { MasterConfig } from '@interfaces/index';

import { logger } from '@config/logger.config';

/**
 * Clase que controla el comportamiento de los clusters - workers.
 */
class Master {
  private cluster: any;
  private config: MasterConfig;

  constructor(config: MasterConfig) {
    this.config = config || {};
    this.cluster = this.config.cluster;
  }

  /**
   * Función que inicia un nuevo worker e imprime en consola un mensaje informandolo
   * @returns {void}
   */
  public levantarWorker(): void {
    const worker = this.cluster.fork();
    logger.info(`Worker ${worker.id} is running`);
  }

  /**
   * En caso de que algún cluster muera, esta función vuelve a levantar otro worker a su
   * reemplazo. Lo hace 300ms después, para que no se inicie tan rápido el nuevo worker
   * @returns {void}
   */
  public levantarWorkerMuerto(): void {
    // Esperamos unos milisegundos para levantar de nuevo un worker
    setTimeout(() => {
      this.levantarWorker();
    }, 300);
  }
}

export default Master;
