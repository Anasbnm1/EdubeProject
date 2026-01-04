import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/DashboardStudent.css";

function DashboardStudent() {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setStudent(res.data.user);
                setCourses([
                    { title: "Mathématiques", description: "Algèbre et analyse", progress: 70 },
                    { title: "Informatique", description: "Programmation et structures", progress: 40 },
                    { title: "Physique", description: "Mécanique et thermodynamique", progress: 55 },
                ]);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!student) return <div className="loader">Chargement...</div>;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Bienvenue {student.name} 👋</h2>
                <p>Filière : {student.filiere}</p>
                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                >
                    Déconnexion
                </button>
            </header>

            <h3>📚 Vos cours</h3>
            <div className="courses-grid">
                {courses.map((course, i) => (
                    <div key={i} className="course-card">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <button>Voir détails</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashboardStudent;