import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../redux/actions";
import RecipeList from "../components/RecipeList";
import "../styles/upload.css"
import { firestore } from "../firebase";

const Home = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    const unsubscribe = firestore.collection("recipes").onSnapshot((snapshot) => {
      const recipes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setRecipes(recipes));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1 className="heading">Recipe List</h1>
      <div className="button-container">
        <button className="button">Button 1</button>
        <button className="button">Button 2</button>
        <button className="button">Button 3</button>
      </div>
      <RecipeList className="recipe-list" recipes={recipes} />
    </div>
  );
};

export default Home;
