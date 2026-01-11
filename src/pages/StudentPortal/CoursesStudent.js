import React, { useEffect, useState } from "react";
import StudentLayout from "./StudentLayout";
import "../../styles/StudentPortal/CoursesStudent.css";
import filieres from "../../config/modules"; // ton fichier modules.js

function Courses() {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsed = JSON.parse(userData);
            setStudent(parsed);

            const modulesFiliere = filieres[parsed.filiere] || [];
            const formattedCourses = modulesFiliere.map(m => ({
                title: m.name,
                description: m.description,
                icon: "📚"
            }));
            setCourses(formattedCourses);
        } else {
            // ⚡ Valeur par défaut pour tester
            const fakeStudent = { filiere: "" };
            setStudent(fakeStudent);

            const modulesFiliere = filieres[fakeStudent.filiere] || [];
            const formattedCourses = modulesFiliere.map(m => ({
                title: m.name,
                description: m.description,
                icon: "📚"
            }));
            setCourses(formattedCourses);
        }
    }, []);

    if (!student) {
        return (
            <StudentLayout>
                <div className="courses-container">
                    <h2>Chargement des informations...</h2>
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="courses-container">
                <h2>📚 Modules de la filière {student.filiere}</h2>
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