import React from "react";

const ProfileView = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return (
      <div className="p-6 text-red-600">
        No logged-in user data found. Please log in again.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        👤 Player Profile
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=0D8ABC&color=fff`}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {user.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {user.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">Role:</span>{" "}
            {user.membership_type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
