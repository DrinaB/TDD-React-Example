import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  let submitRecipe = (event) => {
       event.preventDefault();


    let newRecipeName = document.getElementById("newRecipeName").value;
    let newRecipeInstructions = document.getElementById(
      "newRecipeInstructions"
    ).value;

    this.setState({
      recipes: [
        {
          name: newRecipeName,
          instructions: newRecipeInstructions,
        },
      ],
    });
  };

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      <p>There are no recipes to list</p>
      {recipeFormShown ? (
        <>
          <form id="recipe-form" name="recipe=form" onSubmit={submitRecipe}>
            <label htmlFor="newRecipeName">Recipe name:</label>
            <input type="text" id="newRecipeName" />
            <label htmlFor="newRecipeInstructions">instructions:</label>
            <textarea
              id="newRecipeInstructions"
              placeholder='"wwrite recipe instructions here...'
            />
            <input type="submit" />
          </form>
        </>
      ) : (
        <button onClick={() => showRecipeForm(!recipeFormShown)}>
          Add Recipe
        </button>
      )}
    </div>
  );
}

export default App;
