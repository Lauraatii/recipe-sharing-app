import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../firebase';
import { clearUser } from '../redux/actions';
import "../styles/header.css";
import logo from "../pages/share-a-dish-logo.png";


function Header({ user, clearUser }) {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        clearUser();
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          {user && user.uid ? (
            <>
              <li>
                <Link to="/upload">Upload Recipe</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { clearUser })(Header);
