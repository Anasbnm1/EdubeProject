import React from "react";
import SideBarTeacher from "./SideBarTeacher";
import "../../styles/TeacherPortal/TeacherLayout.css";

function TeacherLayout({ children }) {
    return (
        <div className="student-layout">
            <SideBarTeacher />
            <main className="student-content">
                {children}
            </main>
        </div>
    );
}

export default TeacherLayout;