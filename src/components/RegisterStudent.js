import React, { useState } from "react";
import axios from "axios";
import "../styles/StudentPortal/RegisterStudent.css"; // le CSS qu'on va créer

function RegisterStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filiere, setFiliere] = useState("");
  const [groupe, setGroupe] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register/student", {
        name,
        email,
        password,
        filiere,
        groupe,
      });
      setSuccess("Inscription Étudiant réussie !");
      setError("");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
      setSuccess("");
    }
  };

  return (
      <div className="register-container">
        <h2>Créer un compte Étudiant</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />

          {/* Sélection Filière */}
          <select value={filiere} onChange={(e) => setFiliere(e.target.value)} required>
            <option value="">-- Choisir une Filière --</option>
            <option value="Informatique">Génie Informatique</option>
            <option value="Civil">Génie Civil</option>
            <option value="Electrique">Génie Electrique</option>
            <option value="Mecanique">Génie Mécanique</option>
          </select>

          {/* Sélection Groupe */}
          <select value={groupe} onChange={(e) => setGroupe(e.target.value)} required>
            <option value="">-- Choisir un Groupe --</option>
            <option value="G1">Groupe 1</option>
            <option value="G2">Groupe 2</option>
            <option value="G3">Groupe 3</option>
            <option value="G4">Groupe 4</option>
          </select>

          <button type="submit">S'inscrire</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
  );
}

export default RegisterStudent;