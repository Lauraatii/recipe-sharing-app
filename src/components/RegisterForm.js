import React, { useState } from "react";
import { auth, firestore } from '../firebase';
import { setUser, setError } from "../redux/actions";
import { useDispatch } from "react-redux";
import "../styles/registerform.css";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({ displayName }).then(() => {
          dispatch(setUser(user));
          const userDocRef = doc(firestore, "users", user.uid);
          setDoc(userDocRef, { displayName });
          setIsRegistered(true);
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      });
  };

  return (
    <div className="register-form-container">
      {isRegistered ? (
        <div>
          <h2>Registration successful!</h2>
          <p>Welcome, {displayName}! You can now log in with your new account.</p>
        </div>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export { RegisterForm };
