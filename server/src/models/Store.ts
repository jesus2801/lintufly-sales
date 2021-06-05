import { Schema, model, Types } from 'mongoose';

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  business: {
    type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  dir: {
    tpye: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
});

export default model('Store', storeSchema);
