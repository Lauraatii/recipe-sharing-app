import React, { useState } from "react";
import { auth } from '../firebase';
import { setUser, setError } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
        dispatch(setUser(user));
        // Redirect to the main page after successful login
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setError(errorMessage));
      });
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
