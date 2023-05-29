// import React, { useState } from 'react';

// const RecipeRating = () => {
//   const [rating, setRating] = useState(null);
//   const [comment, setComment] = useState('');


//   const handleRatingChange = (e) => {
//     setRating(e.target.value);
//   };


//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Rating:', rating);
//     console.log('Comment:', comment);
//     // Add code to submit the rating and comment to the database
//   };


//   return (
//     <div>
//       <h3>Rate this recipe:</h3>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input type="radio" id="star5" name="rating" value="5" onChange={handleRatingChange}/>
//           <label htmlFor="star5" title="5 stars">5 stars</label>
//           <input type="radio" id="star4" name="rating" value="4" onChange={handleRatingChange}/>
//           <label htmlFor="star4" title="4 stars">4 stars</label>
//           <input type="radio" id="star3" name="rating" value="3" onChange={handleRatingChange}/>
//           <label htmlFor="star3" title="3 stars">3 stars</label>
//           <input type="radio" id="star2" name="rating" value="2" onChange={handleRatingChange}/>
//           <label htmlFor="star2" title="2 stars">2 stars</label>
//           <input type="radio" id="star1" name="rating" value="1" onChange={handleRatingChange}/>
//           <label htmlFor="star1" title="1 star">1 star</label>
//         </div>
//         <div>
//           <textarea placeholder="Add a comment..." value={comment} onChange={handleCommentChange}></textarea>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };


// export default RecipeRating;
