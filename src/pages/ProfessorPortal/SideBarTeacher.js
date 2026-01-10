import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/StudentPortal/SideBar.css";

export default function SideBarTeacher({ open, onClose }) {
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
                <li><Link to="/teacher/dashboard" onClick={onClose}>🏠 <span>Dashboard</span></Link></li>
                <li><Link to="/teacher/listteacher" onClick={onClose}>📚 <span>Liste Étudiants</span></Link></li>
                <li><Link to="/teacher/gradesteacher" onClick={onClose}>📝 <span>Notes</span></Link></li>
                <li><Link to="/teacher/planningteacher" onClick={onClose}>📅 <span>Emploi du temps</span></Link></li>
                <li>
                    <button className="logout-link" onClick={handleLogout}>🚪 <span>Déconnexion</span></button>
                </li>
            </ul>
        </aside>
    );
}
