import React, { useState } from "react";

const TrainingPlan = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Fitness");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [trainings, setTrainings] = useState([]);

  const handleCreateTraining = () => {
    if (!title || !date) return;
    const newTraining = { title, type, description, date };
    setTrainings([...trainings, newTraining]);
    setTitle("");
    setType("Fitness");
    setDescription("");
    setDate("");
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Training Plan</h2>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Training Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Fitness">Fitness</option>
            <option value="Tactical">Tactical</option>
            <option value="Match Prep">Match Prep</option>
          </select>

          <input
            type="datetime-local"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCreateTraining}
          >
            ➕ Create Training
          </button>
        </div>

        {/* Trainings List */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">📋 Upcoming Trainings</h3>
          {trainings.length === 0 && (
            <p className="text-gray-500">No trainings added yet.</p>
          )}
          <ul className="space-y-3">
            {trainings.map((t, idx) => (
              <li
                key={idx}
                className="border rounded p-3 bg-gray-50 shadow-sm space-y-1"
              >
                <div className="font-bold">{t.title}</div>
                <div className="text-sm text-gray-700">
                  {t.type} — {formatDate(t.date)}
                </div>
                {t.description && (
                  <p className="text-sm text-gray-600">{t.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlan;
