const mongoose = require("mongoose");

const Food = new mongoose.Schema({});

module.exports.FoodSchema = Food;
module.exports.FoodModel = mongoose.model("Food", Food);
