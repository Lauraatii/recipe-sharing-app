import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/recipeList.css"

const RecipeCard = ({ recipe }) => {
  console.log('Recipe in RecipeCard:', recipe);
  console.log('Image URL in RecipeCard:', recipe.image);

  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image"  />
    </Link>
  );
};

export default RecipeCard;
