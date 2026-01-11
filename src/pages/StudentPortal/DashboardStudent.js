import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "./StudentLayout";
import "../../styles/StudentPortal/DashboardStudent.css";
import filieres from "../../config/modules"; // <-- import des modules par filière

function DashboardStudent() {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const user = res.data.user;
                setStudent(user);

                // ✅ Charger les modules de la filière de l'étudiant
                const modulesFiliere = filieres[user.filiere] || [];
                const formattedCourses = modulesFiliere.map((m) => ({
                    title: m.name,
                    description: m.description,
                    icon: "📚", // tu peux changer l’icône par filière si tu veux
                }));
                setCourses(formattedCourses);

                // ✅ Exemple de calendrier basé sur les modules de la filière
                const formattedCalendar = modulesFiliere.slice(0, 5).map((m, i) => ({
                    day: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"][i],
                    course: m.name,
                    time: "08h00 - 10h00",
                    room: `Salle P20${i + 1}`,
                }));
                setCalendar(formattedCalendar);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!student) return <p>Chargement...</p>;

    return (
        <StudentLayout>
            <div className="dashboard-content">
                <h2>Bienvenue {student.name} 👋</h2>
                <p>Filière : {student.filiere}</p>

                <h3>📚 Vos cours</h3>
                <div className="courses-grid">
                    {courses.map((course, i) => (
                        <div key={i} className="course-card">
                            <h4>{course.icon} {course.title}</h4>
                            <p>{course.description}</p>
                            <button>Voir détails</button>
                        </div>
                    ))}
                </div>

                <h3>📅 Calendrier universitaire</h3>
                <table className="calendar-table">
                    <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Cours</th>
                        <th>Horaire</th>
                        <th>Salle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {calendar.map((item, i) => (
                        <tr key={i}>
                            <td>{item.day}</td>
                            <td>{item.course}</td>
                            <td>{item.time}</td>
                            <td>{item.room}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </StudentLayout>
    );
}

export default DashboardStudent;