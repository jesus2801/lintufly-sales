import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema, model, Document } from 'mongoose';
import { IModel } from '@interfaces/schema';

/**
 * Interfaz del modelo de "Business"
 */
export interface IBusiness extends Document {
  /**
   * Nombre de la empresa
   */
  name: string;
  /**
   * Email de la empresa
   */
  mail: string;
  /**
   * Moneda que maneja la empresa
   */
  currency: string;
  /**
   * Telefonos de la empresa
   */
  phones: string[];
  /**
   * Imagenes de la empresa
   */
  imgs: string[];
  /**
   * Código de la empresa
   */
  code: string;
  /**
   * Estado de la empresa
   */
  state: boolean;
  /**
   * Fecha en milisegundos de la unión de la empresa a la plataforma
   */
  union: number;
}

/**
 * Schema de las empresas
 * @category Models
 */
const businessSchema = new Schema({
  name: {
    type: String,
    required: [true, 'code:required'],
    unique: true,
    dropDups: true,
  },
  mail: {
    type: String,
    required: [true, 'code:required'],
    unique: true,
    dropDups: true,
  },
  state: {
    type: Boolean,
    required: [true, 'code:required'],
    default: true,
  },
  currency: {
    type: String,
    required: [true, 'code:required'],
    default: 'USD',
  },
  imgs: {
    type: [String],
    required: [true, 'code:required'],
    default: [],
  },
  phones: {
    type: [String],
    required: [true, 'code:required'],
    default: [],
  },
  code: {
    type: String,
    required: [true, 'code:required'],
    unique: true,
    dropDups: true,
  },
  union: {
    type: Number,
    required: [true, 'code:required'],
    default: Date.now(),
  },
});

//TODO: arreglar este tipado
//@ts-ignore
businessSchema.plugin(mongoosePaginate);

export default model<IBusiness>('Business', businessSchema) as IModel<IBusiness>;
