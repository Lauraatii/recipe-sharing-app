import React, { useEffect, useState } from "react";
import { firestore, storage } from '../firebase';
import { useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import RecipeCard from "../components/RecipeCard";
import styles from '../styles/profile.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile</h1>
      {user && user.uid ? (
        <div>
          <p className={styles.welcomeMessage}>Welcome, {user.email}</p>
          <UserCard user={user} />
          <h3 className={styles.subHeading}>Your Recipes:</h3>
          {userRecipes.length > 0 ? (
  userRecipes.map((recipe) => (
    <div key={recipe.id}>
      <RecipeCard
        recipe={recipe}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteRecipe}
        showButtons={true}
      />
    </div>
  ))
) : (
  <p className={styles.noRecipesMessage}>
    You have not yet created any recipes.
  </p>
)}
        </div>
      ) : (
        <p className={styles.loginMessage}>
          Please log in to view your profile.
        </p>
      )}
    </div>
  );
  
};

export default Profile;
