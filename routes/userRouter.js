const express = require('express');
const {
  register,
  signin,
  updateUsrInfo,
  getUsrDetail,
} = require('../controllers/userController');
const { verifyAuthentication } = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', signin);
userRouter.put('/:_id/update', verifyAuthentication, updateUsrInfo);
userRouter.post('/info', verifyAuthentication, getUsrDetail);

module.exports = userRouter;
