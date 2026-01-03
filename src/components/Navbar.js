import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // fichier CSS optionnel

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Edube</div>
      <ul className="navbar-links">
        <li><Link to="/student">Étudiant</Link></li>
        <li><Link to="/professor">Professeur</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;