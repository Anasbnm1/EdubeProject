import React, { useState, useEffect } from "react";
import "../../styles/StudentPortal/PlanningStudent.css";
import StudentLayout from "./StudentLayout";
import filieres from "../../config/modules"; // <-- import des modules par filière

function EmploiDuTemps() {
    const [schedule, setSchedule] = useState([]);
    const [student, setStudent] = useState(null);

    // Fonction utilitaire pour générer un horaire aléatoire
    const randomTime = () => {
        const slots = [
            "08h00 - 10h00",
            "10h00 - 12h00",
            "14h00 - 16h00",
            "16h00 - 18h00"
        ];
        return slots[Math.floor(Math.random() * slots.length)];
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsed = JSON.parse(userData);
            setStudent(parsed);

            // ✅ Charger les modules de la filière
            const modulesFiliere = filieres[parsed.filiere] || [];

            // Générer un emploi du temps avec horaires aléatoires
            const generatedSchedule = modulesFiliere.slice(0, 5).map((m, i) => ({
                day: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"][i],
                course: m.name,
                time: randomTime(), // horaire aléatoire
                room: `Salle P20${i + 1}`,
            }));

            setSchedule(generatedSchedule);
        }
    }, []);

    if (!student) {
        return (
            <StudentLayout>
                <div className="emploi-container">
                    <h2>📅 Emploi du temps</h2>
                    <p>Chargement des informations...</p>
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="emploi-container">
                <h2>📅 Emploi du temps ({student.filiere})</h2>
                <table className="emploi-table">
                    <thead>
                    <tr>
                        <th>Jour</th>
                        <th>Cours</th>
                        <th>Horaire</th>
                        <th>Salle</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedule.map((item, i) => (
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

export default EmploiDuTemps;