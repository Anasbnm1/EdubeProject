import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // fichier CSS optionnel

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Edube</div>
      <ul className="navbar-links">
        <li><Link to="/Actualité">Actualité</Link></li>
        <li><Link to="/Event">Evénement</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;