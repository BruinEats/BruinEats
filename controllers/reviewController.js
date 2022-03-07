/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const FoodModel = require('../models/food');
const ReviewModel = require('../models/review');
const UserModel = require('../models/user');
require('dotenv').config();

module.exports.addUsrReview = async (req, res, next) => {
  const { user_id, review_id } = req.params;
  const newReview = req.body;

  try {
    const reveiwToInsert = new ReviewModel(newReview);
    await reveiwToInsert.save();
    res.status(200).json(reveiwToInsert);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUsrReview = async (req, res) => {
  try {
    const { _id } = req.params;

    const review = await ReviewModel.findById(_id);
    const food = await FoodModel.findById(review.food);
    const user = await UserModel.findById(review.user);

    res
      .status(200)
      .json({ review: { review, foodName: food.name, userName: user.name } });
  } catch (error) {
    res.status(500).json({ error });
  }
};
