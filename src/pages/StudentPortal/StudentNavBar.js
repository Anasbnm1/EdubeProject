import React from "react";

function StudentNavbar() {
    return (
        <nav className="student-navbar">
            <h1 className="logo">🎓 Edube</h1>
            <button
                className="logout-btn"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; // redirection vers login
                }}
            >
                Déconnexion
            </button>
        </nav>
    );
}

export default StudentNavbar;