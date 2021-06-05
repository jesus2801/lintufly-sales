import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema, model } from 'mongoose';

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
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
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
  imgs: {
    type: [String],
    required: true,
    default: [],
  },
  phones: {
    type: [String],
    required: true,
    default: [],
  },
  union: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

businessSchema.plugin(mongoosePaginate);

export default model('Business', businessSchema);
