import React from 'react';
import { connect } from 'react-redux';
import { RegisterForm } from "../components/RegisterForm";
import { setUser, setError } from '../redux/actions';
import { auth } from '../firebase';


const Register = ({ setUser, setError }) => {
  const handleRegister = (displayName, email, password, confirmPassword) => {
    // Call Firebase auth method to register the user
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        // Update the user's display name and dispatch the setUser action
        user.updateProfile({ displayName }).then(() => {
          setUser(user);
        });
      })
      .catch((error) => {
        // If unsuccessful, dispatch the setError action with the error message
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default connect(null, { setUser, setError })(Register);
