const mongoose = require('mongoose');

const DiningHall = new mongoose.Schema({
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

module.exports = mongoose.model('DiningHall', DiningHall);
