import express from "express";
import mongoose from "mongoose";

import { RecipeModel } from "../models/Recipe.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/createRecipe", async (req, res) => {
  const { title, instructions, ingredients, imgUrl, time, userOwner } =
    req.body;

  try {
    const newRecipe = new RecipeModel({
      title,
      instructions,
      ingredients,
      imgUrl,
      time,
      userOwner,
    });

    await newRecipe.save();

    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the recipe" });
  }
});

router.put("/pushRecipes", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await UserModel.findById(req.body.userId);

    user.savedRecipe.push(recipe);
    user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/SavedRecipes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    res.json({ savedRecipe: user?.savedRecipe });
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.get("/getSavedRecipe/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RecipeModel.findById(id);
    res.json(result);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

export { router as recipeRouter };
