import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/RegisterStudent";
import DashboardStudent from "./pages/StudentPortal/DashboardStudent";
import ProfessorDashboard from "./components/ProfessorDashboard";
import Navbar from "./components/Navbar";
import RegisterProfessor from "./components/RegisterProfessor";
import RegisterStudent from "./components/RegisterStudent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerstudent" element={<RegisterStudent />} />
        <Route path="/registerprofessor" element={<RegisterProfessor />} />
        <Route path="/student/dashboard" element={<DashboardStudent />} />
        <Route path="/professor" element={<ProfessorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;