const express = require('express');
const {
  scrap,
  getAllFood,
  getFoodDetailById,
  addFood,
  removeFood,
  insertFoodReview,
  removeFoodReview,
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
foodRouter.post(
  '/:_id/:reviewIdToRemove/remove',
  verifyAuthentication,
  removeFoodReview
);

module.exports = foodRouter;
