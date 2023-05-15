import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../redux/actions";
import RecipeForm from "../components/RecipeForm";

const Upload = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user);

  const handleUpload = (recipe) => {
    if (user && user.email) {
      dispatch(addRecipe(recipe, user.email));
    } else {
    }
  };

  return (
    <div>
      <h1>Upload Recipe</h1>
      <RecipeForm onSubmit={handleUpload} />
    </div>
  );
};

export default Upload;
