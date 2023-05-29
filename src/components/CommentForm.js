import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';  // import the hook
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const addComment = async (recipeId, commentData) => {
  const db = getFirestore();
  const commentsRef = collection(db, 'comments');

  try {
    const docRef = await addDoc(commentsRef, {
      recipeId,
      ...commentData,
      authorImage: `https://source.unsplash.com/random/100x100?faces`, // Adds random image URL to each comment
    }); // Adds a new document to the 'comments' collection,adddoc
    console.log('Comment added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};

const CommentForm = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.user);  // accessing the user data from redux state


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
    const commentData = {
      content: comment,
      author: user.email,
      timestamp: new Date().toISOString(),
    }; 
    await addComment(id, commentData);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
