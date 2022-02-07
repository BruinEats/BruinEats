const mongoose = require('mongoose')

const Review = new mongoose.Schema({})

module.exports.ReviewSchema = Review
module.exports.ReviewModel = mongoose.model('Review', Review)
