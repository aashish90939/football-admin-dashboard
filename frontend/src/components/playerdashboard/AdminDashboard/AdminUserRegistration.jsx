import React, { useEffect, useState } from "react";

const AdminUserRegistration = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/users/pending");
      const data = await res.json();
      setPendingUsers(data);
    } catch (err) {
      console.error("Error fetching pending users:", err);
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      const res = await fetch(`/api/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      console.log(result.message);
      fetchPending(); // refresh list
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">
        Pending User Approvals
      </h2>
      {pendingUsers.length === 0 ? (
        <p className="text-gray-600">No pending users.</p>
      ) : (
        <ul className="space-y-4">
          {pendingUsers.map((user) => (
            <li
              key={user.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-blue-800">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">
                  Membership: {user.membership_type}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleStatusUpdate(user.id, "accepted")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(user.id, "declined")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminUserRegistration;
