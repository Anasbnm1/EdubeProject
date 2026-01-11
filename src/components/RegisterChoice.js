import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterChoice.css";

function RegisterChoice() {
    const navigate = useNavigate();

    return (
        <div className="register-choice-container">
            <h2>Créer un compte</h2>
            <p>Veuillez choisir votre type de compte :</p>

            <div className="register-buttons">
                <button
                    className="register-btn student-btn"
                    onClick={() => navigate("/registerstudent")}
                >
                    👨‍🎓 Je suis un Étudiant
                </button>

                <button
                    className="register-btn professor-btn"
                    onClick={() => navigate("/registerprofessor")}
                >
                    👨‍🏫 Je suis un Professeur
                </button>
            </div>
        </div>
    );
}

export default RegisterChoice;