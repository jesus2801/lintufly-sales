import { Schema, model, Types } from 'mongoose';

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
    required: true,
  },
  comments: {
    type: [String],
    required: true,
    default: [],
  },
});

export default model('Product', productSchema);
