import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>
      <div className="recipe-details">
        <p className="recipe-time">{recipe.time} min</p>
        <p className="recipe-servings">{recipe.servings} servings</p>
      </div>
    </div>
  );
};

export default RecipeCard;
