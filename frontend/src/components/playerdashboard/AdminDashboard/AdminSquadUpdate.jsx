import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminSquadUpdate = () => {
  const [players, setPlayers] = useState([]);
  const [updating, setUpdating] = useState({});

  const fetchSquad = async () => {
    try {
      const res = await fetch("/api/users/full-profiles");
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error fetching players:", err);
      toast.error("Failed to load players.");
    }
  };

  useEffect(() => {
    fetchSquad();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("User deleted.");
        fetchSquad();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
      toast.error("Error deleting player.");
    }
  };

  const handleChange = (userId, field, value) => {
    setPlayers((prev) =>
      prev.map((p) => (p.user_id === userId ? { ...p, [field]: value } : p))
    );
  };

  const handleUpdate = async (player) => {
    setUpdating((prev) => ({ ...prev, [player.user_id]: true }));
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`/api/users/${player.user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Add this
        },
        body: JSON.stringify({
          role: player.role,
          membership_type: player.membership_type,
          jersey_number: player.jersey_number,
          position: player.position,
        }),
      });

      if (res.ok) {
        toast.success("User updated.");
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Update error.");
    } finally {
      setUpdating((prev) => ({ ...prev, [player.user_id]: false }));
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        🛠 Admin Squad Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Jersey #</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Membership</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, index) => (
              <tr key={p.user_id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">
                  <select
                    value={p.position || ""}
                    onChange={(e) =>
                      handleChange(p.user_id, "position", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="">—</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfield">Midfield</option>
                    <option value="Forward">Forward</option>
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={p.jersey_number || ""}
                    onChange={(e) =>
                      handleChange(p.user_id, "jersey_number", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-20"
                  />
                </td>
                <td className="p-3">
                  <select
                    value={p.role}
                    onChange={(e) =>
                      handleChange(p.user_id, "role", e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="player">Player</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super-Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <select
                    value={p.membership_type}
                    onChange={(e) =>
                      handleChange(p.user_id, "membership_type", e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="player">Player</option>
                    <option value="general">General</option>
                    <option value="honorary">Honorary</option>
                  </select>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(p)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    disabled={updating[p.user_id]}
                  >
                    {updating[p.user_id] ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => handleDelete(p.user_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminSquadUpdate;
