import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
  name: {
    tpye: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  pass: {
    type: String,
    required: true,
  },
  union: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Client', clientSchema);
