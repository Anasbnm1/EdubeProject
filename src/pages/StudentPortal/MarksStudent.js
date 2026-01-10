import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/StudentPortal/NotesEtudiant.css";
import StudentLayout from "./StudentLayout";
import filieres from "../../config/modules"; // <-- import du config

function Grades() {
    const [grades, setGrades] = useState([]);
    const [studentFiliere, setStudentFiliere] = useState("Informatique"); // valeur par défaut

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:5000/api/auth/grades/me", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Notes récupérées :", res.data);
                setGrades(res.data.grades || []);

                if (res.data.grades?.length > 0) {
                    const filiereApi = res.data.grades[0].student.filiere;
                    console.log("Filière API :", filiereApi);
                    console.log("Modules trouvés :", filieres[filiereApi]);
                    setStudentFiliere(filiereApi);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    // Modules de la filière de l'étudiant
    const modules = filieres[studentFiliere] || [];

    // Regrouper les notes par module
    const groupedGrades = grades.reduce((acc, g) => {
        if (!acc[g.module]) acc[g.module] = [];
        acc[g.module].push(g);
        return acc;
    }, {});

    // Calcul moyenne d’un module
    const moduleAverage = (notes) => {
        if (!notes || notes.length === 0) return 0;
        const total = notes.reduce(
            (sum, n) => sum + (n.test1 + n.intra + n.test2 + n.finale) / 4,
            0
        );
        return total / notes.length;
    };

    // Moyenne générale
    const generalAverage =
        Object.values(groupedGrades).length > 0
            ? Object.values(groupedGrades).reduce(
            (sum, notes) => sum + moduleAverage(notes),
            0
        ) / Object.values(groupedGrades).length
            : 0;

    // Modules validés (>= 10)
    const validatedModules = Object.values(groupedGrades).filter(
        (notes) => moduleAverage(notes) >= 10
    ).length;

    // Modules en rattrapage (< 10)
    const retakeModules = modules
        .map((m) => m.name)
        .filter((m) => moduleAverage(groupedGrades[m] || []) < 10);

    return (
        <StudentLayout>
            <div className="grades-container">
                <h2>📝 Notes des modules du semestre ({studentFiliere})</h2>
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
                    {modules.map((module, i) => {
                        const notes = groupedGrades[module.name] || [];
                        if (notes.length === 0) {
                            // Module sans note → afficher vide
                            return (
                                <tr key={i}>
                                    <td>{module.name}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            );
                        }
                        // Afficher toutes les notes du module
                        return (
                            <>
                                {notes.map((n, j) => (
                                    <tr key={`${i}-${j}`}>
                                        <td>{module.name}</td>
                                        <td>{n.test1 ?? "-"}</td>
                                        <td>{n.intra ?? "-"}</td>
                                        <td>{n.test2 ?? "-"}</td>
                                        <td>{n.finale ?? "-"}</td>
                                        <td>
                                            {(
                                                (n.test1 + n.intra + n.test2 + n.finale) /
                                                4
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        );
                    })}
                    </tbody>
                </table>

                <div className="grades-summary">
                    <p>
                        <strong>Moyenne générale :</strong> {generalAverage.toFixed(2)}
                    </p>
                    <p>
                        <strong>Modules validés :</strong> {validatedModules}
                    </p>
                    <p>
                        <strong>Modules en rattrapage :</strong>{" "}
                        {retakeModules.join(", ") || "Aucun"}
                    </p>
                </div>
            </div>
        </StudentLayout>
    );
}

export default Grades;