import React from 'react';
import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Recipe Sharing App</p>
          </div>
          <div className="col-md-6">
          <p>Contact us at support@recipesharingapp.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
