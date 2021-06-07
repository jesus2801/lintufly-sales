import { Schema, model, Types } from 'mongoose';

/**
 * Schema de los empleados de las empresas
 * @category Models
 */
const employeeSchema = new Schema({
  name: {
    type: String,
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
  role: {
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
    unique: true,
    dropDups: true,
  },
  union: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Employee', employeeSchema);
