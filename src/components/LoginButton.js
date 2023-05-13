import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <li>
      <Link to="/login">Log In</Link>
    </li>
  );
};

console.log("Rendering LoginButton");


export default LoginButton;
