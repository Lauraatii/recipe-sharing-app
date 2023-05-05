
import React from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../redux/actions";
import RecipeForm from "../components/RecipeForm";

const Upload = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    if (user) {
      dispatch(addRecipe(data));
    } else {
      // handle error for unauthenticated user
    }
  };
  
  const user = useSelector((state) => state.auth);

  const handleUpload = (recipe) => {
    dispatch(addRecipe(recipe));
  };


  return (
    <div>
      <h1>Upload Recipe</h1>
      <RecipeForm onSubmit={handleUpload} />
    </div>
  );
};

export default Upload;

