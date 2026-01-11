import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/TeacherPortal/StatsTeacher.css";
import TeacherLayout from "./TeacherLayout";

function StatsTeacher() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get("http://localhost:5000/api/auth/grades/stats", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Statistiques récupérées :", res.data);
                setStats(res.data.stats || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement stats :", err);
                setLoading(false);
            });
    }, []);

    // Calculate overall statistics
    const overallAvg = stats.length > 0
        ? (stats.reduce((sum, stat) => sum + stat.avgNote, 0) / stats.length).toFixed(2)
        : 0;

    const globalMin = stats.length > 0
        ? Math.min(...stats.map(s => s.minNote)).toFixed(2)
        : 0;

    const globalMax = stats.length > 0
        ? Math.max(...stats.map(s => s.maxNote)).toFixed(2)
        : 0;

    if (loading) {
        return (
            <TeacherLayout>
                <div className="stats-container">
                    <h2>📊 Statistiques des modules</h2>
                    <p>Chargement des statistiques...</p>
                </div>
            </TeacherLayout>
        );
    }

    return (
        <TeacherLayout>
            <div className="stats-container">
                <h2>📊 Statistiques des modules</h2>

                {/* Global Statistics Summary */}
                <div className="stats-summary">
                    <div className="stat-card">
                        <h3>Moyenne générale</h3>
                        <p className="stat-value">{overallAvg}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Note minimale globale</h3>
                        <p className="stat-value">{globalMin}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Note maximale globale</h3>
                        <p className="stat-value">{globalMax}</p>
                    </div>
                </div>

                {/* Statistics Table */}
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>Moyenne</th>
                            <th>Note minimale</th>
                            <th>Note maximale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.length > 0 ? (
                            stats.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat._id}</td>
                                    <td>
                                        <span className={stat.avgNote >= 10 ? "grade-pass" : "grade-fail"}>
                                            {stat.avgNote.toFixed(2)}
                                        </span>
                                    </td>
                                    <td>{stat.minNote.toFixed(2)}</td>
                                    <td>{stat.maxNote.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    Aucune statistique disponible
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </TeacherLayout>
    );
}

export default StatsTeacher;