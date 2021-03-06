const mongoose = require('mongoose');

const Food = new mongoose.Schema({
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

module.exports = mongoose.model('Food', Food);
