import { Types } from 'mongoose';

import { StoreData, StoreDoc } from '@interfaces/schema/store.interfaces';

import StoreModel from '@models/Store.model';

/**
 * Clase de servicios para las store
 */
class StoreServices {
  /**
   * Servicio para crear una tienda o local
   * @param data información de la tienda o local a crear
   * @returns {StoreDoc} retorna el documento añadido
   */
  public async create(data: StoreData): Promise<StoreDoc> {
    const store = new StoreModel();
    store.name = data.name;
    store.business = new Types.ObjectId(data.business);
    store.dir = data.dir;
    store.desc = data.desc;
    await store.save();

    return store;
  }
}

export default new StoreServices();
