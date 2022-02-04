const mongoose = require("mongoose");
const Review = require("./review").ReviewSchema;
const Food = require("./food").FoodSchema;

const User = new mongoose.Schema({
  id: {
    type: String,
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },

  // might need s3 bucket
  // avatar

  reviews: [Review],
  favorites: [Food],
});

module.exports = mongoose.model("User", User);
