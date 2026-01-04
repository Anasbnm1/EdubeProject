import React, { useState, useEffect } from "react";
import "../../styles/PlanningStudent.css";
import StudentLayout from "./StudentLayout";

function EmploiDuTemps() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // Exemple statique (plus tard tu pourras récupérer depuis ton backend)
        setSchedule([
            { day: "Lundi", course: "Base de donnée NoSQL", time: "08h00 - 10h00", room: "Salle P205" },
            { day: "Lundi", course: "Mathématiques", time: "10h00 - 12h00", room: "Salle P201" },
            { day: "Lundi", course: "Programmation Mobile", time: "14h00 - 16h00", room: "Salle P306" },

            { day: "Mardi", course: "Intelligence Artificielle", time: "08h00 - 10h00", room: "Salle P206" },
            { day: "Mardi", course: "Réseaux", time: "10h00 - 12h00", room: "Salle P305" },
            { day: "Mardi", course: "Analyse de données", time: "14h00 - 16h00", room: "Salle P307" },

            { day: "Mercredi", course: "Sécurité Informatique", time: "14h00 - 16h00", room: "Salle P309" },

            { day: "Jeudi", course: "Base de donnée NoSQL", time: "08h00 - 10h00", room: "Salle P205" },
            { day: "Jeudi", course: "Mathématiques", time: "10h00 - 12h00", room: "Salle P201" },
            { day: "Jeudi", course: "Programmation Mobile", time: "14h00 - 16h00", room: "Salle P306" },

            { day: "Vendredi", course: "Sécurité Informatique", time: "14h00 - 16h00", room: "Salle P309" },
        ]);
    }, []);

    return (
        <StudentLayout>
            <div className="emploi-container">
                <h2>📅 Emploi du temps</h2>
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