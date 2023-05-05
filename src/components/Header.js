import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/header.css"

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Recipe Sharing App Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
          <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/upload">Upload Recipe</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;
