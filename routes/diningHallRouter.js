const express = require('express');
const { add } = require('../controllers/diningHallController');

const diningHallRouter = express.Router();

diningHallRouter.post('/add', add);

module.exports = diningHallRouter;
