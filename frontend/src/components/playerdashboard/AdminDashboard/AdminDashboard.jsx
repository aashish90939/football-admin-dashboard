import React, { useState } from "react";
import AdminEventUpdate from "./AdminEventUpdate";
import AdminNewsUpdate from "./AdminNewsUpdate";
import AdminSquadUpdate from "./AdminSquadUpdate";
import AdminUserRegistration from "./AdminUserRegistration";
import AdminContactFormResponse from "./AdminContactFormResponse";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

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
      default:
        return null;
    }
  };

  const navItems = [
    { key: "events", label: "Event Update" },
    { key: "news", label: "News Update" },
    { key: "squad", label: "Squad Update" },
    { key: "users", label: "User Registration" },
    { key: "contactForm", label: "Contact Form Responses" },
  ];

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Admin Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeTab === item.key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Component */}
        <div className="bg-slate-50 rounded-lg p-6 border">
          {renderActiveComponent()}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
