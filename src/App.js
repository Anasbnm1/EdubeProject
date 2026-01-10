import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import DashboardStudent from "./pages/StudentPortal/DashboardStudent";
import Navbar from "./components/Navbar";
import RegisterProfessor from "./components/RegisterProfessor";
import RegisterStudent from "./components/RegisterStudent";
import NotesEtudiant from "./pages/StudentPortal/MarksStudent";
import PlanningStudent from "./pages/StudentPortal/PlanningStudent";
import CoursesStudent from "./pages/StudentPortal/CoursesStudent";
import DashboardTeacher from "./pages/ProfessorPortal/DashboardTeacher";
import ListTeacher from "./pages/ProfessorPortal/ListTeacher";
import GradesTeacher from "./pages/ProfessorPortal/GradesTeacher";

function App() {
  return (
      <Router>
        {/* Navbar fixe en haut */}
        <Navbar />

        {/* Wrapper pour décaler le contenu sous le navbar */}
        <div style={{ marginTop: "60px" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registerstudent" element={<RegisterStudent />} />
            <Route path="/registerprofessor" element={<RegisterProfessor />} />

            {/* Routes Student */}
            <Route path="/student/dashboard" element={<DashboardStudent />} />
            <Route path="/student/grades" element={<NotesEtudiant />} />
            <Route path="/student/planningstudent" element={<PlanningStudent />} />
            <Route path="/student/coursesstudent" element={<CoursesStudent />} />

            {/* Routes Teacher */}
            <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
            <Route path="/teacher/listteacher" element={<ListTeacher />} />
            <Route path="/teacher/planningteacher" element={<PlanningStudent />} />
            <Route path="/teacher/gradesteacher" element={<GradesTeacher />} />

            {/* Ancienne route professor (doublon) */}
            <Route path="/professor/dashboard" element={<DashboardTeacher />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
