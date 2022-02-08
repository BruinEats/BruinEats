const express = require('express');
const { getMenu } = require('../controllers/menuController');

const menuRouter = express.Router();

menuRouter.post('/menu', menuRouter);

module.exports = menuRouter;
