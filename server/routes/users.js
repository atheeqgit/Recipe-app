import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (userExists) {
    res.json({
      message: "User alredy exists..",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();

      res.json(newUser);
    } catch (err) {
      res.json(err);
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userExists = await UserModel.findOne({ username });

  if (!userExists) {
    res.json({
      message: "the user does exists..",
    });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!isPasswordValid) {
        res.json({
          message: "the PASSWORD is INCORRECT!",
        });
      } else {
        const token = jwt.sign({ id: userExists._id }, "secret");

        res.json({ token, userID: userExists._id });
      }
    } catch (err) {
      res.json(err);
    }
  }
});

export { router as userRouter };
