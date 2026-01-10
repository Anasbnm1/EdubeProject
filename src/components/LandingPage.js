import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Bienvenue sur Edube 🎓</h1>
        <p>La plateforme de suivi scolaire pour étudiants et professeurs</p>
      </header>

      <div className="landing-actions">
        <div className="card">
          <h2>Déjà inscrit ?</h2>
          <p>Connectez-vous pour accéder à votre espace.</p>
            <a href="/login" className="btn">Login</a>
        </div>

        <div className="card">
          <h2>Nouveau sur Edube ?</h2>
          <p>Créez un compte pour commencer votre parcours.</p>
            <a href="/registerstudent" className="btn btn-secondary">S'inscrire</a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;