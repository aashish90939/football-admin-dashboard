import React, { useState } from "react";
import {
  FaUsersCog,
  FaRegNewspaper,
  FaCalendarPlus,
  FaUserPlus,
  FaEnvelopeOpenText,
  FaChalkboardTeacher,
} from "react-icons/fa";
import AdminEventUpdate from "./AdminEventUpdate";
import AdminNewsUpdate from "./AdminNewsUpdate";
import AdminSquadUpdate from "./AdminSquadUpdate";
import AdminUserRegistration from "./AdminUserRegistration";
import AdminContactFormResponse from "./AdminContactFormResponse";
import TrainingPlan from "./TrainingPlan";
import { useNavigate } from "react-router-dom";

const AdminPanelLayout = () => {
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "events":
        return <AdminEventUpdate />;
      case "news":
        return <AdminNewsUpdate />;
      case "squad":
        return <AdminSquadUpdate />;
      case "users":
        return <AdminUserRegistration />;
      case "contactForm":
        return <AdminContactFormResponse />;
      case "training":
        return <TrainingPlan />;
      default:
        return null;
    }
  };

  const navItems = [
    { key: "events", label: "Event Update", icon: <FaCalendarPlus /> },
    { key: "news", label: "News Update", icon: <FaRegNewspaper /> },
    { key: "squad", label: "Squad Update", icon: <FaUsersCog /> },
    { key: "users", label: "User Registration", icon: <FaUserPlus /> },
    { key: "contactForm", label: "Contact Form", icon: <FaEnvelopeOpenText /> },
    { key: "training", label: "Training Plan", icon: <FaChalkboardTeacher /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-md p-4 border-r">
        <h2 className="text-xl font-bold text-blue-700 mb-6 text-center">
          Admin Tools
        </h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-left ${
                activeTab === item.key
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("/dashboard/profile")}
          className="w-full mt-6 text-sm text-blue-500 hover:underline"
        >
          ← Back to Player Dashboard
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
          >
            ← Back to Dashboard
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanelLayout;
