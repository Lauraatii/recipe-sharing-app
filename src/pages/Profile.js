// import React from "react";
// import { useSelector } from "react-redux";
// import UserCard from "../components/UserCard";

// const Profile = () => {
//   const user = useSelector((state) => state.currentUser);

//   return (
//     <div>
//       <h1>Profile</h1>
//       <UserCard user={user} />
//     </div>
//   );
// };

// export default Profile;


import React from 'react';
import { connect } from 'react-redux';
import { Profile, Loader } from '../components';
import { clearUser } from '../redux/actions';

const ProfilePage = ({ user, clearUser }) => {
  const handleLogout = () => {
    // Call Firebase auth method to sign out the user
    // ...
    // Update Redux store with empty user data
    clearUser();
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Profile</h2>
          <Profile user={user} onLogout={handleLogout} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { clearUser })(ProfilePage);
