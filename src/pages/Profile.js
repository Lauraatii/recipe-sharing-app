import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { clearUser, setUser } from '../redux/actions';
import { auth } from '../firebase';


const ProfilePage = ({ user, clearUser, setUser }) => {
  const handleLogin = () => {
    // Call Firebase auth method to sign in the user
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Update the Redux store with the user information
        setUser(user);
      })
      .catch((error) => {
        console.error('Error signing in: ', error);
      });
  };

  const handleLogout = () => {
    // Call Firebase auth method to sign out the user
    auth.signOut()
      .then(() => {
        // Update Redux store with empty user data
        clearUser();
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <div>
      {user && user.uid ? (
        <div>
          <h2>Profile</h2>
          <Profile user={user} />
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
};
// "user" made accesible as a prop in comp
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { clearUser, setUser })(ProfilePage);
