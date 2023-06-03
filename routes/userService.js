const express = require("express");
const userRouter = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = {userRouter}