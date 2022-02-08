const express = require('express');
const {
  register,
  signin,
  updateUsrInfo,
  getUsrDetail,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', signin);
userRouter.put('/:_id/update', updateUsrInfo);
userRouter.post('/info', getUsrDetail);

module.exports = userRouter;
