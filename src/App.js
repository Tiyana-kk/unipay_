import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/auth/Login";
import StudentDashboard from "./roles/student/StudentDashboard";
import HodDashboard from "./roles/hod/HodDashboard";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/hod/dashboard" element={<HodDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;