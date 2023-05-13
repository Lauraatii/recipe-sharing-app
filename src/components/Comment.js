import React from 'react';

const Comment = ({ comment, onDeleteComment }) => {
  const handleDelete = () => {
    onDeleteComment(comment.recipeId, comment.id);
  };

  return (
    <div className="comment">
      <h4>{comment.author}</h4>
      <p>{comment.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Comment;
