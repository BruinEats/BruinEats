/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecretKey = require('../config/default.json').jwtSecret;
const ReviewModel = require('../models/review');

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
