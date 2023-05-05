// import React from "react";
import React, { useEffect } from "react";
import { auth } from '../firebase';
import { clearUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, update Redux store
        dispatch({ type: "SET_USER", payload: user });
      } else {
        // User is signed out, clear Redux store
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Profile</h1>
      {user ? <ProfileCard user={user} /> : <p>Please log in to view your profile.</p>}
    </div>
  );
};
export default Profile;
