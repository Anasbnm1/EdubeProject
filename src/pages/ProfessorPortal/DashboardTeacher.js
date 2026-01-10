import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherLayout from "./TeacherLayout";
import "../../styles/TeacherPortal/DashboardTeacher.css";

function DashboardTeacher() {
    const [teacher, setTeacher] = useState(null);
    const [modules, setModules] = useState([]);
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setTeacher(res.data.user);

                // Modules enseignés
                setModules([
                    { title: "Base de donnée NoSQL", group: "Groupe A", icon: "🗄️" },
                    { title: "Programmation Mobile", group: "Groupe B", icon: "📱" },
                    { title: "Intelligence Artificielle", group: "Groupe C", icon: "🤖" },
                ]);

                // Exemple de calendrier
                setCalendar([
                    { day: "Lundi", course: "Base de donnée NoSQL", time: "08h00 - 10h00", room: "Salle P205" },
                    { day: "Mardi", course: "Programmation Mobile", time: "10h00 - 12h00", room: "Salle P306" },
                    { day: "Mercredi", course: "Intelligence Artificielle", time: "14h00 - 16h00", room: "Salle P206" },
                ]);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!teacher) return <p>Chargement...</p>;

    return (
        <TeacherLayout>
            <div className="teacher-dashboard">
                <h2>Bienvenue Professeur {teacher.name} 👋</h2>
                <p>Filière : {teacher.filiere}</p>

                {/* Modules enseignés */}
                <h3>📚 Vos modules</h3>
                <div className="modules-grid">
                    {modules.map((m, i) => (
                        <div key={i} className="module-card">
                            <h4>{m.icon} {m.title}</h4>
                            <p>Groupe : {m.group}</p>
                            <div className="actions">
                                <button className="action-btn">👨‍🎓 Voir étudiants</button>
                                <button className="action-btn">📝 Saisir notes</button>
                                <button className="action-btn">📅 Emploi du temps</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Calendrier */}
                <h3>📅 Calendrier</h3>
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
        </TeacherLayout>
    );
}

export default DashboardTeacher;