import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import AdminPage from './admin/pages/AdminPage'
import AdminLogin from './admin/AdminLogin';
import AdminSignup from "./admin/AdminSignup";
import SupervisorPage from "./supervisor/pages/SupervisorPage";
// import TutorRequest from "./supervisor/components/TutorRequest";
import TutorTable from "./supervisor/request/TutorTable";
import TutorProfileMgt from "./supervisor/request/TutorProfileMgt";
import AllCourse from "./supervisor/course/AllCourse"
import AddCourse from "./supervisor/course/AddCourse";
import Tutor from "./supervisor/Tutor/Tutor";
import SupervisorReport from "./components/reports/SupervisorReport";
// import { useSelector } from "react-redux";
// import Chat from "./pages/chat/Chat";

function App() {
  // const user = useSelector((state) => state.authReducer.authData);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/supervisorDashboard" element={<SupervisorPage />} />
        <Route path="/tutorRequest" element={<TutorTable />} />
        <Route path="/tutorProfile/:id" element={<TutorProfileMgt />} />
        <Route path="/allCourses" element={<AllCourse />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/tutors" element={<Tutor />} />
        <Route path="/supervisorReport" element={<SupervisorReport />} />
        {/* <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
