import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import SideBarStudent from "../pages/StudentPortal/SideBarStudent";
import SideBarTeacher from "../pages/ProfessorPortal/SideBarTeacher";

// Fonction pour décoder le rôle depuis le token JWT
function getUserRoleFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = token.split(".")[1]; // partie centrale du JWT
    try {
        const decoded = JSON.parse(atob(payload));
        return decoded.role; // "student" ou "professor"
    } catch (e) {
        console.error("Erreur de décodage du token", e);
        return null;
    }
}

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const roleFromToken = getUserRoleFromToken();
        setRole(roleFromToken);
        console.log("Navbar role:", roleFromToken);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
        console.log("toggleSidebar ->", !sidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setSidebarOpen(false);
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleSidebar}>☰</button>
                    <div className="navbar-title">Edube</div>
                </div>

                <ul className="navbar-links">
                    <li><Link to="/Actualité">Actualité</Link></li>
                    <li><Link to="/Event">Evénement</Link></li>
                </ul>

                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>

            {/* Sidebar dynamique selon rôle */}
            {role === "student" && (
                <SideBarStudent open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            )}
            {role === "professor" && (
                <SideBarTeacher open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            )}

            {/* Fallback si aucun rôle n'est présent */}
            {!role && sidebarOpen && (
                <div
                    className="sidebar open"
                    style={{
                        position: "fixed",
                        top: 60,
                        left: 0,
                        width: 260,
                        height: "calc(100vh - 60px)",
                        background: "#0f172a",
                        color: "#cbd5e1",
                        zIndex: 960,
                        padding: "16px 12px",
                        boxShadow: "2px 0 10px rgba(0,0,0,0.4)"
                    }}
                >
                    <button
                        onClick={() => setSidebarOpen(false)}
                        style={{ fontSize: 24, color: "#fff", background: "none", border: "none" }}
                    >
                        ×
                    </button>
                    <div style={{ opacity: 0.8 }}>
                        Aucun rôle trouvé dans le token. Assure-toi que ton backend inclut `role` dans le JWT.
                    </div>
                </div>
            )}

            {sidebarOpen && (
                <div
                    className="overlay"
                    onClick={() => setSidebarOpen(false)}
                    style={{ zIndex: 950 }}
                />
            )}
        </>
    );
}

export default Navbar;
