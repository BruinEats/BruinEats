const express = require('express');
const { scrap } = require('../controllers/foodController');

const foodRouter = express.Router();

foodRouter.post('/scrap', scrap);

module.exports = foodRouter;
