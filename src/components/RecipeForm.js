import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage, auth } from '../firebase';
import "../styles/upload.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Modal from 'react-modal';

const RecipeForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVegan, setIsVegan] = useState(false);


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { value, selectionStart } = event.target;
      event.target.value = value.slice(0, selectionStart) + "\n" + value.slice(selectionStart);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      console.error("Image not selected");
      return;
    }
  
    // Uploads image to Firebase Storage
    console.log(storage);

    await firebase.storage().ref(`images/${image.name}`).put(image);
    const imageUrl = await firebase.storage().ref(`images/${image.name}`).getDownloadURL();


    // Checks if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    // Saves recipe data to Firestore
    const db = getFirestore();
    const recipesRef = collection(db, "recipes");
    const newRecipe = {
      title,
      description,
      image: imageUrl,
      time,
      servings,
      ingredients,
      instructions,
      createdBy: user.uid, 
      createdByEmail: user.email, 
      createdAt: serverTimestamp(),
      isVegan,
    };
    await addDoc(recipesRef, newRecipe);
  
    setModalIsOpen(true);
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };  
  

  const updateIngredient = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const updateInstruction = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Share Your Recipe with Others</h2>
        <input type="text" id="title" placeholder="Recipe Name" value={title} required onChange={(e) => setTitle(e.target.value)} />
        <textarea id="description" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
        <label htmlFor="vegan" className="label-vegan">
          Is this recipe vegan?
          <input type="checkbox" id="vegan" onChange={() => setIsVegan(!isVegan)} />
        </label>
        <label htmlFor="image" className="file-upload-label" >Upload image</label>
        <input type="file" id="image" required onChange={handleImageChange} />
        <input type="number" id="time" required placeholder="Time (minutes)" value={time} onChange={(e) => setTime(e.target.value)} />
        <input type="number" id="servings" placeholder="Servings" required value={servings} onChange={(e) => setServings(e.target.value)} />
        {ingredients.map((ingredient, index) => (
          <textarea
            key={index}
            rows="2"
            placeholder="Ingredients"
            required
            value={ingredient}
            onChange={(e) => updateIngredient(index, e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ))}
        {instructions.map((instruction, index) => (
          <textarea
            key={index}
            rows="3"
            required
            placeholder="Instruction"
            value={instruction}
            onChange={(e) => updateInstruction(index, e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ))}
        <button type="submit">Submit</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Recipe Upload Success"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2 className="modal-heading">RECIPE UPLOAD SUCCESS</h2>
        <div className="success-message">
        <span className="emoji" role="img" aria-label="party">🎉</span>
        <p>You can see your recipe under your profile.</p>
        </div>
        <div className="button-container">
        <button onClick={() => navigate('/')}>Browse More Recipes</button>
        <button onClick={() => navigate('/profile')}>Go to My Profile</button>
        </div>
        <button className="close-modal" onClick={closeModal}>×</button>
        </Modal>
    </>
  );
};

export default RecipeForm;
