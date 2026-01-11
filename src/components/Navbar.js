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
        setRole(null);
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                {/* Gauche : bouton menu */}
                <div className="navbar-left">
                    <button className="menu-btn" onClick={toggleSidebar}>☰</button>
                </div>

                {/* Centre : logo */}
                <div className="navbar-center">
                    <div className="navbar-title">🎓 Edube</div>
                </div>

                {/* Droite : login/logout/menu selon rôle */}
                <div className="navbar-right">
                    {!role ? (
                        <button className="login-btn" onClick={handleLogin}>
                            Se Connecter
                        </button>
                    ) : (
                        <>
                            {role === "student" && (
                                <ul className="navbar-links">
                                    <li><Link to="student/grades">Mes Notes</Link></li>
                                    <li><Link to="/student/coursesstudent">Modules</Link></li>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Déconnexion
                                    </button>
                                </ul>
                            )}
                            {role === "professor" && (
                                <ul className="navbar-links">
                                    <li><Link to="/teacher/listteacher">Mes Étudiants</Link></li>
                                    <li><Link to="/teacher/gradesteacher">Ajouter Notes</Link></li>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Déconnexion
                                    </button>
                                </ul>
                            )}
                        </>
                    )}
                </div>
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
                        Aucun utilisateur connecté
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