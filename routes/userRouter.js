const express = require("express");
const { register, signin } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", signin);

module.exports = userRouter;
