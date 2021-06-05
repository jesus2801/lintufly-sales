import { Schema, model, Types } from 'mongoose';

/**
 * Schema de los estados de los pedidos
 * @category Models
 */
const stateSchema = new Schema({
  state: {
    type: Number,
    min: 0,
    max: 2,
    required: true,
    default: 0,
  },
  date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

/**
 * Schema de los pedidos de las empresas
 * @category Models
 */
const saleSchema = new Schema({
  product: {
    type: Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  store: {
    type: Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  empl: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: false,
  },
  client: {
    type: Types.ObjectId,
    ref: 'Client',
    required: false,
  },
  state: {
    type: [stateSchema],
    required: true,
    default: [],
  },
  date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Sale', saleSchema);
