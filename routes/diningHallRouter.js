const express = require('express');
const { add, getAllDiningHall, getAllDiningHallDetails } = require('../controllers/diningHallController');

const diningHallRouter = express.Router();

diningHallRouter.post('/add', add);
diningHallRouter.get('/all', getAllDiningHall);
diningHallRouter.get('/:_id', getAllDiningHallDetails);

module.exports = diningHallRouter;
