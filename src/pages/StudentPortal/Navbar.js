import React from "react";
import { Link } from "react-router-dom";

function Navbar({ toggleDarkMode }) {
    return (
        <nav className="navbar">
            <h1 className="logo">🎓 Edube</h1>
            <div className="nav-links">
                <Link to="/student/dashboard">Dashboard</Link>
                <Link to="/student/courses">Cours</Link>
                <Link to="/student/grades">Notes</Link>
                <Link to="/student/timetable">Emploi du temps</Link>
                <Link to="/student/profile">Profil</Link>
            </div>
            <button className="darkmode-btn" onClick={toggleDarkMode}>
                🌙 / ☀️
            </button>
        </nav>
    );
}

export default Navbar;