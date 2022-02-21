const mongoose = require('mongoose');

const Review = new mongoose.Schema({
  score: {
    type: Number,
    default: 3.0,
    required: true,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  comment: {
    type: String,
    default: '',
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Review', Review);
