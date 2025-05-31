import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import RequireAdmin from "./RequireAdmin";
import ProtectedRoutes from "./ProtectedRoutes";

import Home from "../components/homepage/home";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import Intro from "../components/homepage/Intro";
import Team from "../components/homepage/Team";
import Gallery from "../components/homepage/Gallery";
import Contact from "../components/homepage/Contact";

import Squad from "../components/playerdashboard/GeneralSidebarFunctions/Squad";
import ProfileView from "../components/playerdashboard/GeneralSidebarFunctions/ProfileView";
import MatchHistory from "../components/playerdashboard/GeneralSidebarFunctions/MatchHistory";
import TrainingSchedule from "../components/playerdashboard/GeneralSidebarFunctions/TrainingSchedule";
import AttendanceRecord from "../components/playerdashboard/GeneralSidebarFunctions/AttendanceRecord";

import AdminDashboard from "../components/playerdashboard/AdminDashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/about", element: <Intro /> },
      { path: "/team", element: <Team /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <ProfileView /> }, // ✅ Default route
      { path: "profile", element: <ProfileView /> },
      { path: "matches", element: <MatchHistory /> },
      { path: "trainings", element: <TrainingSchedule /> },
      { path: "attendance", element: <AttendanceRecord /> },
      { path: "squad", element: <Squad /> },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
      },
    ],
  },
]);
export default router;
