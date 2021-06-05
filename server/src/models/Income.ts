import { Schema, model, Types } from 'mongoose';

const incomeSchema = new Schema({
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
    Type: Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  date: {
    type: Number,
    required: true,
    default: Date.now(),
  },
});

export default model('Income', incomeSchema);
