import React, { useState, useEffect } from "react";
import "./recipe.css";
import axios from "axios";

const Recipe = (props) => {
  const { imgUrl, ingredients, instructions, title, time, _id } = props.data;
  const userID = window.localStorage.getItem("userID");
  const [savedArray, setSavedArray] = useState([]);

  const fetchSaved = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/recipe/SavedRecipes/${userID}`
      );

      setSavedArray(response.data.savedRecipe);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => savedArray?.includes(id);

  useEffect(() => {
    fetchSaved();
    isRecipeSaved();
  }, []);

  const saveRecipe = () => {
    const userID = window.localStorage.getItem("userID");

    if (userID) {
      axios
        .put("http://127.0.0.1:3001/recipe/pushRecipes", {
          userId: userID,
          recipeId: _id,
        })
        .then((res) => {
          alert("recipe Saved");
          fetchSaved();
          isRecipeSaved();
        })
        .catch((err) => {
          alert("someting went wrong");
        });
    } else {
      alert("LOGIN or REGISTER to Save recipes");
    }
  };

  return (
    <div className="recipe">
      <div className="top">
        <div className="img-container">
          <img src={imgUrl} />
        </div>
        <div className="info-container">
          <h2 className="title">{title}</h2>
          <ul>
            {ingredients?.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>
        </div>
      </div>
      <p>{instructions}</p>
      {isRecipeSaved(_id) ? (
        ""
      ) : (
        <div
          className="button"
          onClick={() => {
            saveRecipe(_id);
          }}
        >
          Save Recipe
        </div>
      )}
    </div>
  );
};

export default Recipe;
