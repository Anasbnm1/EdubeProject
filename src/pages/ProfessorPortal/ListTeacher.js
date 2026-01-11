import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TeacherPortal/ListTeacher.css";
import TeacherLayout from "./TeacherLayout";

function ListTeacher() {
    const [students, setStudents] = useState([]);
    const [filterGroup, setFilterGroup] = useState("Tous");
    const [filterFiliere, setFilterFiliere] = useState("Tous");

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("http://localhost:5000/api/auth/students", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                console.log("Réponse API :", res.data);
                setStudents(res.data.students || []);
            })
            .catch((err) => console.error(err));
    }, []);

    // ✅ Appliquer les deux filtres
    const filteredStudents = students.filter((s) => {
        const matchGroup = filterGroup === "Tous" || s.groupe === filterGroup;
        const matchFiliere = filterFiliere === "Tous" || s.filiere === filterFiliere;
        return matchGroup && matchFiliere;
    });

    return (
        <TeacherLayout>
            <div className="teacher-container">
                <h2>👨‍🏫 Liste des étudiants</h2>

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

                    <label style={{ marginLeft: "20px" }}>Filtrer par filière :</label>
                    <select
                        value={filterFiliere}
                        onChange={(e) => setFilterFiliere(e.target.value)}
                    >
                        <option value="Tous">Tous</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrique">Electrique</option>
                        <option value="Mecanique">Mécanique</option>
                    </select>
                </div>

                <table className="students-table">
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Groupe</th>
                        <th>Filière</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStudents.length === 0 ? (
                        <tr>
                            <td colSpan="3">Aucun étudiant trouvé</td>
                        </tr>
                    ) : (
                        filteredStudents.map((student, i) => (
                            <tr key={i}>
                                <td>{student.name}</td>
                                <td>{student.groupe}</td>
                                <td>{student.filiere}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </TeacherLayout>
    );
}

export default ListTeacher;