import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Comment from './Comment';

const RecipeComments = ({ onDeleteComment }) => {
  const [comments, setComments] = useState([]);
  const { id } = useParams(); // Get the recipe ID from the URL parameters

  useEffect(() => {
    const fetchComments = async () => {
      const db = getFirestore();
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('recipeId', '==', id));

      const querySnapshot = await getDocs(q);
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });

      setComments(fetchedComments);
    };

    fetchComments();
  }, [id]);

  return (
    <div className="recipe-comments">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDeleteComment={onDeleteComment} />
      ))}
    </div>
  );
};

export default RecipeComments;
