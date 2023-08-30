import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./home.css";
import Recipe from "../../components/recipe/Recipe";

const Home = () => {
  const [recipes, setRecipes] = useState();

  const userID = window.localStorage.getItem("userID");

  const fetchRecipes = async () => {
    Axios.get("http://127.0.0.1:3001/recipe/")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="home" id="container">
      <h1 className="head">explore the recipes</h1>
      <div className="recipes-grid">
        {recipes?.map((recipe, index) => {
          return <Recipe data={recipe} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Home;
