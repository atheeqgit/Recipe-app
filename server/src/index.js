import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "../routes/users.js";
import { recipeRouter } from "../routes/recipe.js";

mongoose
  .connect(
    "mongodb+srv://atheeq:atheeqDB@recipedb.co9rrwl.mongodb.net/recipeDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

const port = 3001;
app.listen(port, () => {
  console.log("Server is Running on port " + port);
});
