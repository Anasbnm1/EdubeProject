import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [emailStudent, setEmailStudent] = useState("");
  const [passwordStudent, setPasswordStudent] = useState("");
  const [emailProfessor, setEmailProfessor] = useState("");
  const [passwordProfessor, setPasswordProfessor] = useState("");
  const [error, setError] = useState("");

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: emailStudent,
        password: passwordStudent,
        role: "student",
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/student/dashboard";
    } catch (err) {
      setError("Email ou mot de passe incorrect (Étudiant)");
    }
  };

  const handleProfessorLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: emailProfessor,
        password: passwordProfessor,
        role: "professor",
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/professor";
    } catch (err) {
      setError("Email ou mot de passe incorrect (Professeur)");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion à Edube</h2>
      <div className="login-cards">
        {/* Card Étudiant */}
        <div className="login-card">
          <h3>Étudiant</h3>
          <form onSubmit={handleStudentLogin} className="login-form">
            <input
              type="email"
              placeholder="Email Étudiant"
              value={emailStudent}
              onChange={(e) => setEmailStudent(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={passwordStudent}
              onChange={(e) => setPasswordStudent(e.target.value)}
              required
            />
            <p className="register-text">
              Don’t have an account? <Link to="/registerstudent">Register</Link>
            </p>
            <button type="submit">Se connecter</button>
          </form>
        </div>

        {/* Card Professeur */}
        <div className="login-card">
          <h3>Professeur</h3>
          <form onSubmit={handleProfessorLogin} className="login-form">
            <input
              type="email"
              placeholder="Email Professeur"
              value={emailProfessor}
              onChange={(e) => setEmailProfessor(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={passwordProfessor}
              onChange={(e) => setPasswordProfessor(e.target.value)}
              required
            />
            <p className="register-text">
              Don’t have an account? <Link to="/registerprofessor">Register</Link>
            </p>
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;