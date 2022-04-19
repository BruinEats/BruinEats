const express = require('express');
const {
  searchFoodName,
  searchDiningHall,
} = require('../controllers/searchController');

const searchRouter = express.Router();

searchRouter.post('/food_name', searchFoodName);
searchRouter.post('/dining_hall', searchDiningHall);

module.exports = searchRouter;
