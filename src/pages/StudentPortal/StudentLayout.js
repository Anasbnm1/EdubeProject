import React from "react";
import Sidebar from "./SideBar";
import "../../styles/StudentLayout.css";

function StudentLayout({ children }) {
    return (
        <div className="student-layout">
            <Sidebar />
            <main className="student-content">{children}</main>
        </div>
    );
}

export default StudentLayout;