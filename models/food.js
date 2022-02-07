const mongoose = require('mongoose')
const DiningHall = require('./diningHall').DiningHallSchema
const Review = require('./review').ReviewSchema

const Food = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },

  overallRating: {
    type: Number,
    default: 0.0,
    required: true,
  },

  reviews: [Review],
  diningHall: [DiningHall],
})

module.exports.FoodSchema = Food
module.exports.FoodModel = mongoose.model('Food', Food)
