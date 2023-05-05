import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../redux/actions";
import RecipeCard from "../components/RecipeCard";
import { firestore } from "../firebase";
import RecipeForm from "../components/RecipeForm";

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore.collection("recipes").doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setRecipe({
          id: doc.id,
          ...doc.data(),
        });
      } else {
        setRecipe(null);
      }
    });
    return unsubscribe;
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
      navigate("/");
    }
  };

  const handleEdit = (updatedRecipe) => {
    firestore.collection("recipes").doc(id).update(updatedRecipe);
    setRecipe(updatedRecipe);
  };

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          <RecipeCard recipe={recipe} />
          {user && user.uid === recipe.authorId && (
            <>
              <button onClick={handleDelete}>Delete Recipe</button>
              <RecipeForm onSubmit={handleEdit} recipe={recipe} />
            </>
          )}
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default Recipe;
