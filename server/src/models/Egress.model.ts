import { Schema, model, Types } from 'mongoose';

/**
 * Schema de los egresos de las empresas
 * @category Models
 */
const egressSchema = new Schema({
  val: {
    type: Number,
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Egress', egressSchema);
