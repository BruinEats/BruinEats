const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  HedrickStudy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  Drey: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  BruinCafe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  Rendevzous: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  FeastAtRieber: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  DeNeve: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  BruinPlate: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
  Epicuria: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

module.exports = mongoose.model('Menu', Menu);
