import React, { useState } from 'react';


const RecipeEditForm = ({ recipe, onEdit, onCancel }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(recipe.image);
  const [time, setTime] = useState(recipe.time);
  const [servings, setServings] = useState(recipe.servings);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [isVegan, setIsVegan] = useState(recipe.isVegan);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      image,
      time,
      servings,
      ingredients,
      instructions,
      isVegan,
    };

    onEdit(updatedData);
  };

  return (
    <form onSubmit={handleEdit}>
      <h2>Edit Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Is this recipe vegan?
        <input
          type="checkbox"
          checked={isVegan}
          onChange={() => setIsVegan(!isVegan)}
        />
      </label>
      <label>Upload image</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input
        type="number"
        placeholder="Time (minutes)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Servings"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />
      {ingredients.map((ingredient, index) => (
        <textarea
          key={index}
          rows="2"
          placeholder="Ingredients"
          value={ingredient}
          onChange={(e) => {
            const updatedIngredients = [...ingredients];
            updatedIngredients[index] = e.target.value;
            setIngredients(updatedIngredients);
          }}
        />
      ))}
      {instructions.map((instruction, index) => (
        <textarea
          key={index}
          rows="3"
          placeholder="Instruction"
          value={instruction}
          onChange={(e) => {
            const updatedInstructions = [...instructions];
            updatedInstructions[index] = e.target.value;
            setInstructions(updatedInstructions);
          }}
        />
      ))}
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeEditForm;
