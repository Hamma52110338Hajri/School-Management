// Navbar.jsx
import React from 'react';

const Navbar = ({ changeView }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-brand" onClick={() => changeView('home')}>
        RBK School
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={() => changeView('students')}>
              Students
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => changeView('teachers')}>
              Teachers
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
