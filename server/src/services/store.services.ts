import { StoreData } from '@interfaces/schema/store.interfaces';

import StoreModel, { IStore } from '@models/Store.model';

/**
 * Clase de servicios para las store
 */
class StoreServices {
  /**
   * Servicio para crear una tienda o local
   * @param data información de la tienda o local a crear
   * @returns {IStore} retorna el documento añadido
   */
  public async create(data: StoreData): Promise<IStore> {
    const store = new StoreModel();
    store.name = data.name;
    store.business = data.business;
    store.dir = data.dir;
    store.desc = data.desc;
    await store.save();

    return store;
  }
}

export default new StoreServices();
