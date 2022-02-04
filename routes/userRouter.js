const express = require("express");
const { register } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);

module.exports = userRouter;
