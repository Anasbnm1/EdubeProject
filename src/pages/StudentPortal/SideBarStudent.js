import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/StudentPortal/SideBar.css";

export default function SideBarStudent({ open, onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        onClose();
        navigate("/login");
    };

    return (
        <aside className={`sidebar ${open ? "open" : ""}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            <ul>
                <li><Link to="/student/dashboard" onClick={onClose}>🏠 <span>Dashboard</span></Link></li>
                <li><Link to="/student/coursesstudent" onClick={onClose}>📚 <span>Cours</span></Link></li>
                <li><Link to="/student/grades" onClick={onClose}>📝 <span>Notes</span></Link></li>
                <li><Link to="/student/planningstudent" onClick={onClose}>📅 <span>Emploi du temps</span></Link></li>
                <li>
                    <button className="logout-link" onClick={handleLogout}>🚪 <span>Déconnexion</span></button>
                </li>
            </ul>
        </aside>
    );
}
