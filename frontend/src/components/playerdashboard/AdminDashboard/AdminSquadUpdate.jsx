import React, { useEffect, useState } from "react";

const AdminSquadUpdate = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({ name: "", position: "" });

  const fetchSquad = async () => {
    try {
      const res = await fetch("/api/users/full-profiles");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      fetchSquad(); // Refresh after deletion
    } catch (err) {
      console.error("Error deleting player:", err);
    }
  };

  const groupedByMembership = (type) =>
    players.filter((p) => p.membership_type === type);

  useEffect(() => {
    fetchSquad();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        🛠 Admin Squad Management
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {["player", "general", "honorary"].map((type) => (
          <div key={type}>
            <h3 className="text-lg font-semibold capitalize mb-3 text-gray-700">
              {type} Members
            </h3>
            <ul className="space-y-3">
              {groupedByMembership(type).map((p) => (
                <li
                  key={p.user_id}
                  className="bg-white p-4 rounded shadow flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-blue-800">{p.name}</h4>
                    <p className="text-sm text-gray-600">
                      {p.position || "No Position"} |{" "}
                      {p.jersey_number ? `#${p.jersey_number}` : "No Jersey"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(p.user_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminSquadUpdate;
