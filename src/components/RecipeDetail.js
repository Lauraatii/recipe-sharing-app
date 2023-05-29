import React, { useEffect, useState } from "react";
// import { firestore } from "../firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RecipeComments from "./RecipeComments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";

const RecipeDetail = ({
  onAddComment,
}) => {
  const { id } = useParams();
  const recipe = useSelector((state) =>
    state.recipes.find((recipe) => recipe.id === id)
  );
  const [creatorProfileImage] = useState(null);

  useEffect(() => {
    const fetchCreatorProfileImage = async () => {
      try {
        // const userDoc = await firestore
        //   .collection("users")
        //   .doc(recipe.createdBy)
        //   .get();
        // const userData = userDoc.data();
        // setCreatorProfileImage(userData.profileImageUrl);
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

  const recipeUrl = window.location.href;

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back</span>
      </Link>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      {recipe.isVegan && <h2 placeholder="leave">This recipe is vegan 🌱</h2>}
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
      <h4>Recipe author: {recipe.createdByEmail}</h4>
      {creatorProfileImage && (
        <img src={creatorProfileImage} alt={recipe.createdByEmail} />
      )}
      <div className="share-button-container">
        <FacebookShareButton url={recipeUrl}>
          <div className="share-button">
            <FacebookIcon size={24} round />
            <span>Share on Facebook</span>
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={recipeUrl}>
          <div className="share-button">
            <TwitterIcon size={24} round />
            <span>Share on Twitter</span>
          </div>
        </TwitterShareButton>
      </div>
      <RecipeComments />
      <CommentForm recipeId={id} onAddComment={onAddComment} />
    </div>
  );
};

export default RecipeDetail;
