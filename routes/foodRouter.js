const express = require('express');
const {
  scrap,
  getAllFood,
  getFoodDetailById,
  addFood,
  removeFood,
  insertFoodReview,
  removeFoodReview,
  addFoodRating,
} = require('../controllers/foodController');
const {
  verifyAuthentication,
  verifyAdmin,
} = require('../controllers/authController');

const foodRouter = express.Router();

foodRouter.post('/scrap', scrap);

foodRouter.get('/all/:page', getAllFood);

foodRouter.post('/add_food', verifyAuthentication, verifyAdmin, addFood);

foodRouter.get('/:_id', getFoodDetailById);
foodRouter.delete('/:_id', verifyAuthentication, verifyAdmin, removeFood);

foodRouter.post('/:_id/add_review', verifyAuthentication, insertFoodReview);
foodRouter.delete(
  '/:_id/:reviewIdToRemove',
  verifyAuthentication,
  removeFoodReview
);

foodRouter.post('/:_id/add_rating', verifyAuthentication, addFoodRating);

module.exports = foodRouter;
