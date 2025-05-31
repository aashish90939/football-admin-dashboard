import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEventUpdate = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/posts?type=event");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to fetch events");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      ...formData,
      type: "event",
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        toast.success("Event added successfully");
        setFormData({ title: "", start_date: "", end_date: "" });
        fetchEvents();
      } else {
        toast.error("Failed to add event");
      }
    } catch (err) {
      console.error("Error adding event:", err);
      toast.error("Error while adding event");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Event deleted successfully");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error while deleting event");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Event
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-500">
              {event.start_date}
              {event.end_date && ` - ${event.end_date}`}
            </p>
            <button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdminEventUpdate;
