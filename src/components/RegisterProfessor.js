import React, { useState } from "react";
import axios from "axios";
import "../styles/TeacherPortal/RegisterProfessor.css";

function RegisterProfessor() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register/professor", {
                name,
                email,
                password,
            });
            setSuccess("Inscription Professeur réussie !");
            setError("");
            setTimeout(() => (window.location.href = "/login"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription.");
            setSuccess("");
        }
    };

    return (
        <div className="register-container">
            <h2>Créer un compte Professeur</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">S'inscrire</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default RegisterProfessor;