import * as mongoose from 'mongoose';

export const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  numRated: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  diningHall: {
    type: String,
    required: true,
  },
});

export interface FoodIntr extends mongoose.Document {
  id: string;
  name: string;
  rating: number;
  numRated: number;
  reviews: string[];
  diningHall: string;
}
