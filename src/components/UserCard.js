import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <img src={user.profileImageUrl} alt="Profile" />
      <p>Email: {user.email}</p>
      <p>Joined: {user.joinedDate}</p>
    </div>
  );
};

export default UserCard;
