import React from 'react';
import '../styles/comment.css';

const Comment = ({ comment }) => {

  return (
    <div className="comment">
    <div className="author-info">
      <img className="author-image" src={comment.authorImage} alt="Author's avatar" />
      <h4>{comment.author}</h4>
    </div>
    <p>{comment.content}</p>
  </div>
  );
};


export default Comment;
