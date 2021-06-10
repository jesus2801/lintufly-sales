import { Schema, model, Types, Document } from 'mongoose';

import { IModel } from '@interfaces/schema';

/**
 * Interfaz del modelo "store"
 */
export interface IStore extends Document {
  /**
   * Nombre de la tienda o local
   */
  name: string;
  /**
   * Empresa a la que pertenece la tienda o local
   */
  business: string;
  /**
   * dirección de la tienda o local
   */
  dir: string;
  /**
   * Descripción sobre la tienda o local
   */
  desc: string;
}

/**
 * Schema de los locales o tiendas de las empresas
 * @category Models
 */
const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  dir: {
    tpye: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
});

export default model<IStore>('Store', storeSchema) as IModel<IStore>;
