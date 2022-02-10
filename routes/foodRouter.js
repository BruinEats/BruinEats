const express = require('express');
const {
  scrap,
  getAllFood,
  getFoodDetailById,
} = require('../controllers/foodController');

const foodRouter = express.Router();

foodRouter.post('/scrap', scrap);
foodRouter.get('/all', getAllFood);
foodRouter.get('/:_id/detail', getFoodDetailById);

module.exports = foodRouter;
