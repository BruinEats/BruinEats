import * as mongoose from 'mongoose';

export const DiningHallSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

export interface DiningHallIntr extends mongoose.Document {
  id: string;
  name: string;
  foods: string[];
}
