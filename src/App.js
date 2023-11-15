import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import AdminPage from './admin/pages/AdminPage'
import AdminLogin from './admin/AdminLogin';
import SupervisorPage from "./supervisor/pages/SupervisorPage";
// import TutorRequest from "./supervisor/components/TutorRequest";
import TutorTable from "./supervisor/components/TutorTable";
import TutorProfileMgt from "./supervisor/components/TutorProfileMgt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/" element={<AdminPage />} />
        <Route path="/supervisorDashboard" element={<SupervisorPage />} />
        <Route path="/tutorRequest" element={<TutorTable />} />
        <Route path="/tutorProfile/:id" element={<TutorProfileMgt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
