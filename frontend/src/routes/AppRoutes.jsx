// routes/AppRoutes.jsx
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminDashboard from "../components/playerdashboard/AdminDashboard";
import RequireAdmin from "./RequireAdmin";
import Home from "../components/homepage/home";
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import Intro from "../components/homepage/Intro";
import Team from "../components/homepage/Team";
import Contact from "../components/homepage/Contact";
import ProfileView from "../components/playerdashboard/ProfileView";
import MatchHistory from "../components/playerdashboard/MatchHistory";
import TrainingSchedule from "../components/playerdashboard/TrainingSchedule";
import AttendanceRecord from "../components/playerdashboard/AttendanceRecord";

import ProtectedRoutes from "./ProtectedRoutes";
import Gallery from "../components/homepage/Gallery";

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
      // Default to /dashboard/profile
      { path: "profile", element: <ProfileView /> },
      { path: "matches", element: <MatchHistory /> },
      { path: "trainings", element: <TrainingSchedule /> },
      { path: "attendance", element: <AttendanceRecord /> },
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
