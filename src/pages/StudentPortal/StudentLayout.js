import React from "react";
import SideBarStudent from "./SideBarStudent";
import "../../styles/StudentPortal/StudentLayout.css";

function StudentLayout({ children }) {
    return (
        <div className="student-layout">
            <SideBarStudent />
            <main className="student-content">{children}</main>
        </div>
    );
}

export default StudentLayout;