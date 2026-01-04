import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    const handleLogout = () => {
        localStorage.removeItem("token"); // supprime le token
        window.location.href = "/login";  // redirige vers la page login
    };

    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/student/dashboard">🏠 Dashboard</Link></li>
                <li><Link to="/student/courses">📚 Cours</Link></li>
                <li><Link to="/student/grades">📝 Notes</Link></li>
                <li><Link to="/student/planningstudent">📅 Emploi du temps</Link></li>
                <li><Link to="/student/profile">👤 Profil</Link></li>
                <li>
                    <button className="logout-link" onClick={handleLogout}>🚪 Déconnexion</button>
                </li>
            </ul>


        </aside>
    );
}

export default Sidebar;