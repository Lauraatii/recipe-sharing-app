import React from 'react';
import RecipeCard from './RecipeCard';
import "../styles/recipeList.css"

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes ? (
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default RecipeList;
