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
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  imageId: {
    type: String,
  },
});

module.exports = mongoose.model('Review', Review);
