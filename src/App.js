import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import AdminPage from './admin/pages/AdminPage'
import AdminLogin from './admin/AdminLogin';
import SupervisorPage from "./supervisor/pages/SupervisorPage";
// import TutorRequest from "./supervisor/components/TutorRequest";
import TutorTable from "./supervisor/request/TutorTable";
import TutorProfileMgt from "./supervisor/request/TutorProfileMgt";
import AllCourse from "./supervisor/course/AllCourse"
import AddCourse from "./supervisor/course/AddCourse";
import Tutor from "./supervisor/Tutor/Tutor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/" element={<AdminPage />} />
        <Route path="/supervisorDashboard" element={<SupervisorPage />} />
        <Route path="/tutorRequest" element={<TutorTable />} />
        <Route path="/tutorProfile/:id" element={<TutorProfileMgt />} />
        <Route path="/allCourses" element={<AllCourse />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/tutors" element={<Tutor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
