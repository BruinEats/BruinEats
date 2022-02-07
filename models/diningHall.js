const mongoose = require('mongoose')
const Food = require('./food').FoodSchema

const DiningHall = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    required: true,
    unique: true,
  },

  food: [Food],
})

module.exports.DiningHallSchema = DiningHall
module.exports.DiningHallModel = mongoose.model('DiningHall', DiningHall)
