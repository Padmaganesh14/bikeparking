import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🚲 Bike Parking</h1>
      <div className="nav-links">
        <NavLink to="/" end>Entry</NavLink>
        <NavLink to="/exit">Exit</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
