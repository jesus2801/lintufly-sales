import { Schema, model, Types, Document } from 'mongoose';

import { IModel } from '@interfaces/schema';

/**
 * Interfaz del modelo de Product
 */
export interface IProduct extends Document {
  /**
   * Nombre del producto
   */
  name: string;
  /**
   * Precio del producto
   */
  price: number;
  /**
   * Id de la empresa a la que pertenece el producto
   */
  business: string;
  /**
   * Imagenes del producto
   */
  imgs: string[];
  /**
   * Descripción del producto
   */
  desc?: string;
  /**
   * Comentarios del producto
   */
  comments: string[];
}

/**
 * Schema de los productos de las empresas
 * @category Models
 */
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  imgs: {
    type: [String],
    required: true,
    default: [],
  },
  desc: {
    type: String,
    required: false,
  },
  comments: {
    type: [String],
    required: true,
    default: [],
  },
});

export default model<IProduct>('Product', productSchema) as IModel<IProduct>;
