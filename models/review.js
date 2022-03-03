const mongoose = require('mongoose');

const Review = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    default: '',
    required: false,
  },
  photo: {
    type: String,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Review', Review);
