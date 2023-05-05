import React from 'react';


const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <img src={user.profileImageUrl} alt="Profile" />
      <p>Email: {user.email}</p>
      <p>Joined: {user.joinedDate}</p>
      <h3>Recipes:</h3>
      {user.recipes.map((recipe) => (
        <div key={recipe.id}>
          <p>{recipe.name}</p>
          <img src={recipe.imageUrl} alt="Recipe" />
        </div>
      ))}
    </div>
 );
};


export default UserCard;
