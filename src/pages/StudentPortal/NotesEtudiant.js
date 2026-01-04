import React, { useEffect, useState } from "react";
import "../../styles/NotesEtudiant.css";
import StudentLayout from "./StudentLayout";

function Grades() {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Exemple de données (plus tard récupérées depuis backend)
        setGrades([
            { module: "Base de donnée NoSQL", notes: [12, 14, 10, 15] },
            { module: "Programmation Mobile", notes: [8, 9, 7, 10] },
            { module: "Intelligence Artificielle", notes: [15, 16, 14, 17] },
            { module: "Réseaux", notes: [11, 12, 10, 13] },
            { module: "Systèmes d’exploitation", notes: [9, 8, 7, 10] },
            { module: "Mathématiques", notes: [13, 12, 14, 15] },
            { module: "Analyse de données", notes: [10, 11, 9, 12] },
            { module: "Sécurité informatique", notes: [14, 13, 15, 16] },
        ]);
    }, []);

    // Calcul moyenne par module
    const moduleAverage = (notes) =>
        notes.reduce((acc, n) => acc + n, 0) / notes.length;

    // Moyenne générale
    const generalAverage =
        grades.reduce((acc, g) => acc + moduleAverage(g.notes), 0) / grades.length;

    // Modules validés (>= 10)
    const validatedModules = grades.filter(
        (g) => moduleAverage(g.notes) >= 10
    ).length;

    // Modules en rattrapage (< 10)
    const retakeModules = grades.filter(
        (g) => moduleAverage(g.notes) < 10
    ).map((g) => g.module);

    return (
        <StudentLayout>
        <div className="grades-container">
            <h2>📝 Notes des modules du semestre</h2>
            <table className="grades-table">
                <thead>
                <tr>
                    <th>Module</th>
                    <th>Test 1</th>
                    <th>Intra</th>
                    <th>Test 2</th>
                    <th>Finale</th>
                    <th>Moyenne</th>
                </tr>
                </thead>
                <tbody>
                {grades.map((g, i) => (
                    <tr key={i}>
                        <td>{g.module}</td>
                        {g.notes.map((n, j) => (
                            <td key={j}>{n}</td>
                        ))}
                        <td>{moduleAverage(g.notes).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="grades-summary">
                <p><strong>Moyenne générale :</strong> {generalAverage.toFixed(2)}</p>
                <p><strong>Modules validés :</strong> {validatedModules}</p>
                <p><strong>Modules en rattrapage :</strong> {retakeModules.join(", ") || "Aucun"}</p>
            </div>
        </div>
        </StudentLayout>
    );
}

export default Grades;