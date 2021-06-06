import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema, model } from 'mongoose';

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
    index: true,
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
  union: {
    type: Number,
    required: [true, 'code:required'],
    default: Date.now(),
  },
});

businessSchema.plugin(mongoosePaginate);

export default model('Business', businessSchema);
