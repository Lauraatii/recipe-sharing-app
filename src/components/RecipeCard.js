import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/recipeList.css"


const RecipeCard = ({ recipe, onEdit, onDelete, showButtons }) => {
  
  return (
    <div className="recipe-card">
     <Link to={`/recipes/${recipe.id}`} className="recipe-link">
      {recipe.isVegan && 
        <div className='vegan-icon-wrapper'>
          <div className='vegan-icon'>🌱</div> 
        </div>
      }
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2 className="recipe-title">{recipe.title}</h2>
    </Link>
      <div className="recipe-details">
        <p className="recipe-time">Time: {recipe.time} min</p>
        <p className="recipe-servings">Servings: {recipe.servings}</p>
      </div>
      {showButtons && (
        <div className="recipe-buttons">
          <button onClick={() => onEdit(recipe.id, recipe)}>Edit</button>
          <button onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;