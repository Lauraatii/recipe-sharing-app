import React, { useEffect, useState } from "react";
import { firestore, storage } from '../firebase';
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import RecipeCard from "../components/RecipeCard";
import '../styles/profile.css';



const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userRecipes, setUserRecipes] = useState([]);

  console.log("User object:", user);

  const handleEditRecipe = async (recipeId, updatedData) => {
    try {
      const recipeRef = firestore.collection('recipes').doc(recipeId);
      await recipeRef.update(updatedData);
      console.log('Recipe updated successfully');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };
  
  const handleDeleteRecipe = async (recipeId) => {
    try {
      const recipeRef = firestore.collection('recipes').doc(recipeId);
      await recipeRef.delete();
      console.log('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  useEffect(() => {
    console.log("User recipes:", userRecipes);
    const loadUserRecipes = async () => {
      if (user && user.uid) {
        try {
          const userRecipesSnapshot = await firestore
            .collection("recipes")
            .where("createdBy", "==", user.uid)
            .get();
  
          console.log("Firebase user object:", user);
  
          const loadedUserRecipes = [];
  
          for (const doc of userRecipesSnapshot.docs) {
            const recipeData = doc.data();
            let recipeImageUrl = null;
          
            if (recipeData.imagePath) {
              recipeImageUrl = await storage.ref(recipeData.imagePath).getDownloadURL();
              console.log('Image URL:', recipeImageUrl);
            }
          
            loadedUserRecipes.push({
              id: doc.id,
              ...recipeData,
              image: recipeData.image, 
            });
          }
  
          setUserRecipes(loadedUserRecipes);
        } catch (error) {
          console.error("Error loading user recipes:", error);
        }
      }
    };
  
    console.log("Loading user recipes...");
    loadUserRecipes();
  }, [user]); 
  

  return (
    <div className="container mt-4">
      <h1 className="text-center">Profile</h1>
      {user && user.uid ? (
        <div>
          <p>Welcome, {user.email}</p>
          <UserCard user={user} />
          <h3>Your Recipes:</h3>
          {userRecipes.length > 0 ? (
          userRecipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
              <button onClick={() => handleEditRecipe(recipe.id, recipe)}>Edit</button>
              <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>You have not yet created any recipes.</p>
        )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
