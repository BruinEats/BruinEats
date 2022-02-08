const express = require('express');
const { getMenu, scrapMenuToday } = require('../controllers/menuController');

const menuRouter = express.Router();

menuRouter.post('/getMenu', getMenu);
menuRouter.post('/scrapMenuToday', scrapMenuToday);

module.exports = menuRouter;
