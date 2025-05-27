// layouts/DashboardLayout.jsx
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/homepage/Navbar";
import Footer from "../components/homepage/Footer";
import PlayerDashboard from "../components/playerdashboard/PlayerDashboard";
const DashboardLayout = () => {
  const token = localStorage.getItem("authToken"); // Check for authentication token

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <PlayerDashboard>
          <Outlet />
        </PlayerDashboard>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
