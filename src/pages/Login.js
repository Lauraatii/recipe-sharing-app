import React from "react";
import { useDispatch } from "react-redux";
import { setUser, setError } from "../redux/actions";
import LoginForm from "../components/LoginForm";
import { auth } from "../firebase";



const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
  }
export default Login;