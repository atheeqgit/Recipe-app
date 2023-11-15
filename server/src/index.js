import express from "express";
require("dotenv").config();
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "../routes/users.js";
import { recipeRouter } from "../routes/recipe.js";

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is Running on port " + process.env.PORT);
});
