import { Schema, model, Types } from 'mongoose';

/**
 * Schema de los empleados de las empresas
 * @category Models
 */
const employeeSchema = new Schema({
  name: {
    tpye: String,
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
  mail: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  pass: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['a', 'e'],
  },
  avatar: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  union: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Employee', employeeSchema);
