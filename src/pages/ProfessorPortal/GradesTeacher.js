import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TeacherPortal/GradesTeacher.css";
import TeacherLayout from "./TeacherLayout";
import filieres from "../../config/modules"; // <-- import du config

function GradesTeacher() {
    const [students, setStudents] = useState([]);
    const [selectedFiliere, setSelectedFiliere] = useState("Informatique");
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    const [grades, setGrades] = useState({});
    const [filterGroup, setFilterGroup] = useState("Tous");

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Récupérer les étudiants
        axios
            .get("http://localhost:5000/api/auth/students", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setStudents(res.data.students || []))
            .catch((err) => console.error(err));
    }, []);

    // Mettre à jour les modules quand la filière change
    useEffect(() => {
        const modulesForFiliere = filieres[selectedFiliere] || [];
        setModules(modulesForFiliere);
        setSelectedModule(modulesForFiliere[0]?.name || "");
    }, [selectedFiliere]);

    // Charger les notes existantes pour le module sélectionné
    useEffect(() => {
        if (!selectedModule) return;
        const token = localStorage.getItem("token");

        // FIXED: Encode the module name to handle special characters like /
        const encodedModule = encodeURIComponent(selectedModule);

        axios
            .get(`http://localhost:5000/api/auth/grades/module/${encodedModule}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const notesMap = {};
                res.data.grades.forEach((g) => {
                    notesMap[g.student._id] = {
                        test1: g.test1,
                        intra: g.intra,
                        test2: g.test2,
                        finale: g.finale,
                        moyenne: g.moyenne,
                        _id: g._id,
                    };
                });
                setGrades(notesMap);
            })
            .catch((err) => console.error("Erreur chargement notes :", err));
    }, [selectedModule]);

    const handleGradeChange = (studentId, type, value) => {
        setGrades((prev) => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [type]: value,
            },
        }));
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");

        Object.keys(grades).forEach((studentId) => {
            const grade = grades[studentId];
            if (grade._id) {
                // Update
                axios
                    .put(
                        `http://localhost:5000/api/auth/grades/${grade._id}`,
                        {
                            test1: parseFloat(grade.test1) || 0,
                            intra: parseFloat(grade.intra) || 0,
                            test2: parseFloat(grade.test2) || 0,
                            finale: parseFloat(grade.finale) || 0,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        console.log("Note mise à jour :", res.data);
                        // Update moyenne in state after successful update
                        setGrades((prev) => ({
                            ...prev,
                            [studentId]: {
                                ...prev[studentId],
                                moyenne: res.data.grade.moyenne,
                            },
                        }));
                    })
                    .catch((err) => console.error(err));
            } else {
                // Create
                axios
                    .post(
                        "http://localhost:5000/api/auth/grades",
                        {
                            studentId,
                            module: selectedModule,
                            test1: parseFloat(grade.test1) || 0,
                            intra: parseFloat(grade.intra) || 0,
                            test2: parseFloat(grade.test2) || 0,
                            finale: parseFloat(grade.finale) || 0,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => {
                        console.log("Note créée :", res.data);
                        // Update moyenne and _id in state after successful creation
                        setGrades((prev) => ({
                            ...prev,
                            [studentId]: {
                                ...prev[studentId],
                                moyenne: res.data.grade.moyenne,
                                _id: res.data.grade._id,
                            },
                        }));
                    })
                    .catch((err) => console.error(err));
            }
        });

        alert("Notes du module " + selectedModule + " enregistrées !");
    };

    // ✅ Helper function to check if all grades are filled
    const hasAllGrades = (studentId) => {
        const grade = grades[studentId];
        if (!grade) return false;

        // Check if all four grades exist and are not empty/null/undefined
        return (
            grade.test1 !== null &&
            grade.test1 !== undefined &&
            grade.test1 !== "" &&
            grade.intra !== null &&
            grade.intra !== undefined &&
            grade.intra !== "" &&
            grade.test2 !== null &&
            grade.test2 !== undefined &&
            grade.test2 !== "" &&
            grade.finale !== null &&
            grade.finale !== undefined &&
            grade.finale !== ""
        );
    };
    // Filtrer les étudiants par filière et groupe
    const filteredStudents = students.filter((s) => {
        const matchFiliere = s.filiere === selectedFiliere;
        const matchGroup = filterGroup === "Tous" || s.groupe === filterGroup;
        return matchFiliere && matchGroup;
    });
    return (
        <TeacherLayout>
            <div className="grades-teacher-container">
                <h2>📝 Saisie des notes</h2>

                {/* Filtre par filière */}
                <div className="filter-section">
                    <label>Choisir une filière :</label>
                    <select
                        value={selectedFiliere}
                        onChange={(e) => setSelectedFiliere(e.target.value)}
                    >
                        {Object.keys(filieres).map((f, i) => (
                            <option key={i} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtre par module */}
                <div className="filter-section">
                    <label>Choisir un module :</label>
                    <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                    >
                        {modules.map((m, i) => (
                            <option key={i} value={m.name}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtre par groupe */}
                <div className="filter-section">
                    <label>Filtrer par groupe :</label>
                    <select
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                    >
                        <option value="Tous">Tous</option>
                        <option value="G1">Groupe 1</option>
                        <option value="G2">Groupe 2</option>
                        <option value="G3">Groupe 3</option>
                        <option value="G4">Groupe 4</option>
                    </select>
                </div>
                {/* Tableau des étudiants */}
                <table className="grades-teacher-table">
                    <thead>
                    <tr>
                        <th>Étudiant</th>
                        <th>Groupe</th>
                        <th>Test 1</th>
                        <th>Intra</th>
                        <th>Test 2</th>
                        <th>Finale</th>
                        <th>Moyenne</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.groupe}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={grades[student._id]?.test1 || ""}
                                    onChange={(e) =>
                                        handleGradeChange(student._id, "test1", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={grades[student._id]?.intra || ""}
                                    onChange={(e) =>
                                        handleGradeChange(student._id, "intra", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={grades[student._id]?.test2 || ""}
                                    onChange={(e) =>
                                        handleGradeChange(student._id, "test2", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    max="20"
                                    value={grades[student._id]?.finale || ""}
                                    onChange={(e) =>
                                        handleGradeChange(student._id, "finale", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                {/* ✅ Only show moyenne if all grades are filled */}
                                {hasAllGrades(student._id) ? (
                                    <span className="moyenne-display">
                                        {grades[student._id].moyenne}
                                    </span>
                                ) : (
                                    <span className="moyenne-incomplete">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <button className="save-btn" onClick={handleSave}>
                    💾 Enregistrer les notes
                </button>
            </div>
        </TeacherLayout>
    );
}
export default GradesTeacher;