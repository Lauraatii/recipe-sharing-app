import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RecipeComments from './RecipeComments';
import CommentForm from './CommentForm';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { firestore } from '../firebase';


const RecipeDetail = ({
  onAddRating,
  onDeleteRating,
  onAddComment,
  onDeleteComment,
}) => {
  const { id } = useParams();
  const recipe = useSelector((state) => state.recipes.find((recipe) => recipe.id === id));
  const [creatorProfileImage, setCreatorProfileImage] = useState(null);

  useEffect(() => {
    const fetchCreatorProfileImage = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(recipe.createdBy).get();
        const userData = userDoc.data();
        setCreatorProfileImage(userData.profileImageUrl);
      } catch (error) {
        console.error("Error fetching creator's profile image:", error);
      }
    };

    if (recipe) {
      fetchCreatorProfileImage();
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </Link>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <div>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <p key={index} className="formatted-text">
              {ingredient}
            </p>
          ))}
      </div>
      <h3>Instructions:</h3>
      <div>
        {recipe.instructions &&
          recipe.instructions.map((instruction, index) => (
            <p key={index} className="formatted-text">
              {instruction}
            </p>
          ))}
      </div>
      <h4>By: {recipe.createdByEmail}</h4>
      {creatorProfileImage && <img src={creatorProfileImage} alt={recipe.createdByEmail} />}
      <RecipeComments />
      <CommentForm
        recipeId={id}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default RecipeDetail;
