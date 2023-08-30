import React, { useEffect, useState } from "react";
import "./saved.css";
import axios from "axios";
import Recipe from "../../components/recipe/Recipe";

const Saved = () => {
  const [savedArray, setSavedArray] = useState([]);
  const [savedRecipesObj, setSavedRecipesObj] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      const userID = window.localStorage.getItem("userID");

      try {
        const response = await axios.get(
          `http://127.0.0.1:3001/recipe/SavedRecipes/${userID}`
        );
        setSavedArray(response.data.savedRecipe);
        fetchRecipe(response.data.savedRecipe);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaved();
  }, []);

  const fetchRecipe = async (recipeIDs) => {
    try {
      const recipePromises = recipeIDs.map(async (id) => {
        const response = await axios.get(
          `http://127.0.0.1:3001/recipe/getSavedRecipe/${id}`
        );
        return response.data;
      });

      const recipeData = await Promise.all(recipePromises);
      setSavedRecipesObj(recipeData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home" id="container">
      <h1 className="head">Saved recipes</h1>
      <div className="recipes-grid">
        {savedRecipesObj?.map((recipe, index) => (
          <Recipe data={recipe} saved={true} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Saved;
