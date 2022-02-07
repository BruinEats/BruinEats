const mongoose = require('mongoose');

const DiningHall = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },
  food: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

module.exports.DiningHallSchema = DiningHall;
module.exports.DiningHallModel = mongoose.model('DiningHall', DiningHall);
