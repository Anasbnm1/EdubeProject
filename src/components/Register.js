import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; // fichier CSS pour le style

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // student ou professor
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setError("");
      // Redirection vers login après inscription
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <h2>Créer un compte Edube</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Nom complet :</label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email :</label>
        <input
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe :</label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Rôle :</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Étudiant</option>
          <option value="professor">Professeur</option>
        </select>

        <button type="submit">S'inscrire</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Register;