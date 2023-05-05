import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';
import RecipeList from '../components/RecipeList';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipesRef = collection(firestore, 'recipes');
    const q = query(recipesRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipeArray = [];
      querySnapshot.forEach((doc) => {
        recipeArray.push({ id: doc.id, ...doc.data() });
      });
      setRecipes(recipeArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default Recipes;
