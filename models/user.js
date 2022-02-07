const mongoose = require('mongoose');

const User = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: '',
    required: true,
  },
  name: {
    type: String,
    default: '',
    required: true,
  },

  // might need s3 bucket
  // avatar

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

module.exports = mongoose.model('User', User);
