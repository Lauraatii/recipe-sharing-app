import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const addComment = async (recipeId, commentData) => {
  const db = getFirestore();
  const commentsRef = collection(db, 'comments');

  try {
    const docRef = await addDoc(commentsRef, {
      recipeId,
      ...commentData,
    });
    console.log('Comment added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
};

const CommentForm = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
    const commentData = {
      content: comment,
      author: 'f', // Replace this with the actual author name, e.g. from user authentication
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


// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import { useSelector } from 'react-redux';

// const addComment = async (recipeId, commentData) => {
//   const db = getFirestore();
//   const commentsRef = collection(db, 'comments');

//   try {
//     const docRef = await addDoc(commentsRef, {
//       recipeId,
//       ...commentData,
//     });
//     console.log('Comment added with ID: ', docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error('Error adding comment: ', error);
//   }
// };

// const CommentForm = () => {
//     const { id } = useParams();
//     const user = useSelector((state) => state.auth.user);
//     console.log(user);
//   const [comment, setComment] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (comment.trim() === '') {
//       alert('Comment cannot be empty');
//       return;
//     }
//     const commentData = {
//       content: comment,
//       author: user.email, // Replace this with the actual author name, e.g. from user authentication
//       timestamp: new Date().toISOString(),
//     };
//     await addComment(id, commentData);
//     setComment('');
//   };

//   return user ? (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Add a comment"
//       ></textarea>
//       <button type="submit">Submit</button>
//     </form>
//   ) : null;
// };

// export default CommentForm;
