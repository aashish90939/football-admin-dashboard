import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

import LatestNews from "./NewsEventSection/LatestNews";
import UpcomingEvents from "./NewsEventSection/UpcomingEvents";

// Importing useLocation to access the current route
import { useLocation } from "react-router-dom";

const PlayerDashboard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true); // ✅ Replaced context with local state
  const navigate = useNavigate();

  // Importing useLocation to access the current route
  const location = useLocation();
  const hideRightPanelRoutes = ["/dashboard/admin"]; // Define routes where the right panel should be hidden
  const shouldHideRightPanel = hideRightPanelRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

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
    { to: "squad", label: "Squad", icon: <FaUser /> },
  ];

  if (user?.role === "admin") {
    navItems.push({
      to: "admin",
      label: "Admin Panel",
      icon: <FaUser />,
    });
  }

  if (user === null) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden flex justify-between px-4 py-2 bg-white shadow z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-blue-50 p-2 rounded-md shadow"
        >
          <FaBars className="text-blue-700" />
        </button>
      </div>

      <div className="flex flex-1 bg-gradient-to-br from-gray-100 to-blue-50 overflow-hidden">
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
          </aside>
        )}

        <main className="flex-1 flex gap-6 p-4 md:p-6 lg:p-10 overflow-y-auto">
          <div
            className={`flex-1 ${
              showRightPanel ? "" : "w-full"
            } transition-all`}
          >
            <div className="bg-white p-6 rounded-xl shadow-md min-h-[400px]">
              {children || <Outlet />}
            </div>
          </div>

          {showRightPanel && !shouldHideRightPanel && (
            <div className="w-[300px] hidden xl:block space-y-6">
              <div className="px-4 py-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
              <UpcomingEvents />
              <LatestNews />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PlayerDashboard;
