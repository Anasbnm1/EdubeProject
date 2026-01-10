import React, { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import "../../styles/StudentPortal/CoursesStudent.css";

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Exemple statique (plus tard tu pourras récupérer depuis ton backend)
        setCourses([
            { title: "Base de donnée NoSQL", description: "Bases non relationnelles, MongoDB, Cassandra", icon: "🗄️" },
            { title: "Programmation Mobile", description: "Développement Flutter et Android", icon: "📱" },
            { title: "Intelligence Artificielle", description: "Machine Learning et Deep Learning", icon: "🤖" },
            { title: "Réseaux", description: "Protocoles, TCP/IP, sécurité réseau", icon: "🌐" },
            { title: "Mathématiques", description: "Algèbre linéaire et analyse", icon: "📐" },
            { title: "Sécurité Informatique", description: "Cryptographie et cybersécurité", icon: "🔒" },
        ]);
    }, []);

    return (
        <StudentLayout>
            <div className="courses-container">
                <h2>📚 Liste des cours</h2>
                <div className="courses-grid">
                    {courses.map((course, i) => (
                        <div key={i} className="course-card">
                            <h3>{course.icon} {course.title}</h3>
                            <p>{course.description}</p>
                            <button className="details-btn">Voir détails</button>
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}

export default Courses;