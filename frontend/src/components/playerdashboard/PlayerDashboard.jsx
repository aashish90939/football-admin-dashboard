import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import {
  FaUser,
  FaFutbol,
  FaDumbbell,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { MdOutlineWhatsapp } from "react-icons/md";

// Navbar & Footer (inline)
const Navbar = () => (
  <header className="w-full bg-white shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-blue-700">Members Area</h1>
    <span className="text-sm text-gray-600">Player Dashboard</span>
  </header>
);

const Footer = () => (
  <footer className="w-full bg-white shadow-inner text-center p-3 text-sm text-gray-500">
    © {new Date().getFullYear()} Football Team Management. All rights reserved.
  </footer>
);

const PlayerDashboard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("profile");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    toast.success("User logged out !");
    navigate("/login");
  };

  const navItems = [
    { to: "profile", label: "Profile", icon: <FaUser /> },
    { to: "matches", label: "Match History", icon: <FaFutbol /> },
    { to: "trainings", label: "Training Schedule", icon: <FaDumbbell /> },
    { to: "attendance", label: "Attendance", icon: <FaCalendarAlt /> },
    { to: "Squad", label: "Squad", icon: <FaFutbol /> },
  ];

  if (user?.role === "admin") {
    navItems.push({
      to: "admin",
      label: "Admin Panel",
      icon: <FaUser />,
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Mobile toggle */}
      <div className="lg:hidden flex justify-between px-4 py-2 bg-white shadow z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-50 p-2 rounded-md shadow"
        >
          <FaBars className="text-blue-700" />
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 bg-gradient-to-br from-gray-100 to-blue-50 overflow-hidden">
        {/* Left Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white shadow-lg hidden lg:flex flex-col justify-between">
            <div>
              <div className="px-6 py-5 border-b">
                <p className="text-md text-gray-500 mt-1">
                  Welcome, {user?.name?.split(" ")[0] || "Player"}
                </p>
              </div>
              <nav className="px-4 pt-6">
                <ul className="space-y-3">
                  {navItems.map(({ to, label, icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition ${
                            isActive
                              ? "bg-blue-100 text-blue-700 shadow"
                              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          }`
                        }
                      >
                        {icon} {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* WhatsApp & Team Info */}
              <div className="mt-8 border-t pt-4 px-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-1">
                    Team Chat Group
                  </h4>
                  <a
                    href="https://chat.whatsapp.com/IGTek0igFGhKEqlUuFb5B7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    <MdOutlineWhatsapp size={20} /> Join WhatsApp
                  </a>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Manager:</strong> Aashish Acharya
                  </p>
                  <p>
                    <strong>Membership:</strong> {user?.membership_type}
                  </p>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="px-4 py-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-[500px] p-4 md:p-6 lg:p-10 overflow-y-auto">
          <div className="w-full bg-white p-6 rounded-xl shadow-md min-h-[400px]">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PlayerDashboard;
