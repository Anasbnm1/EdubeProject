import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "./StudentLayout";
import "../../styles/StudentPortal/DashboardStudent.css";

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
                setStudent(res.data.user);
                setCourses([
                    { title: "Base de donnée NoSQL", description: "Base de donnée non relationnel", icon: "🗄️" },
                    { title: "Programmation Mobile", description: "Programmation Mobile Flutter", icon: "📱" },
                    { title: "Intelligence Artificielle", description: "Machine Learning et Deep Learning", icon: "🤖" },
                ]);

                // Exemple de calendrier universitaire
                setCalendar([
                    { day: "Lundi", course: "Base de donnée NoSQL", time: "08h00 - 10h00", room: "Salle P205" },
                    { day: "Mardi", course: "Programmation Mobile", time: "10h00 - 12h00", room: "Salle P306" },
                    { day: "Mercredi", course: "Intelligence Artificielle", time: "14h00 - 16h00", room: "Salle P206" },
                    { day: "Jeudi", course: "Programmation Mobile", time: "08h00 - 10h00", room: "Salle P305" },
                    { day: "Vendredi", course: "Base de donnée NoSQL", time: "10h00 - 12h00", room: "Salle P205" },
                ]);
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