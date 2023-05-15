import React, { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css';

const UserCard = ({ user }) => {
  const [randomPhoto, setRandomPhoto] = useState(null);

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?count=5&client_id=1TMnxvfElSFA9J6zOu6DA2BFbXMs1TGESJ0GWCCxg8s&faces=true');
        const data = await response.json();
        const photoUrl = data[0]?.urls?.small || null;
        setRandomPhoto(photoUrl);
      } catch (error) {
        console.error('Error fetching random photo:', error);
      }
    };

    fetchRandomPhoto();
  }, []);

  const profilePhoto = user.profileImageUrl || randomPhoto;

  return (
    <div className={styles['user-card']}>
      <h2>{user.name}</h2>
      {profilePhoto && <img src={profilePhoto} alt="Profile" className={styles['profile-image']} />}
      {/* <p>Email: {user.email}</p>
      <p>Joined: {user.joinedDate}</p> */}
    </div>
  );
};

export default UserCard;

