import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL parameters
  const recipe = useSelector(state => state.recipes.find(recipe => recipe.id === id)); // Get the recipe from the Redux store


  if (!recipe) {
    return <div>Loading...</div>; // Display a loading message if the recipe is not found
  }
  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};


export default RecipeDetail;
