const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const key = process.env.KEY;

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.send("Registration Successfull");
      }
    });
  } catch (error) {
    console.log("Error occurred while registering");
    console.log(error);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0]?.password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, key);
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Invalid Credentaials");
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.log("Error occurred while logging in!");
    console.log(error);
  }
});


module.exports={userRoute};