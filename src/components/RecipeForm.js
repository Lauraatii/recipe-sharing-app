import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import "../styles/upload.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/firestore';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";


const RecipeForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
  
    // Save recipe data to Firestore
    const db = getFirestore();
    const recipesRef = collection(db, "recipes");
    const newRecipe = {
      title,
      description,
      imageUrl,
      time,
      servings,
      createdAt: serverTimestamp(),
    };
    await addDoc(recipesRef, newRecipe);
  
    // Redirect to home page
    navigate("/recipes");
  };
  
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Recipe name</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="image">Image</label>
      <input type="file" id="image" onChange={handleImageChange} />

      <label htmlFor="time">Time (minutes)</label>
      <input type="number" id="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <label htmlFor="servings">Servings</label>
      <input type="number" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
