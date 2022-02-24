const express = require('express');
const { getUsrReview } = require('../controllers/reviewController');

const reviewRouter = express.Router();

reviewRouter.get('/:_id', getUsrReview);

module.exports = reviewRouter;
