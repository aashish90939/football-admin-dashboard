import React, { useState } from "react";
import { toast } from "react-toastify";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    membership_type: "general",
    motivation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Clone response so we can parse safely
      let data;
      try {
        data = await res.clone().json();
      } catch (jsonErr) {
        const fallbackText = await res.text();
        console.error("❌ Non-JSON response from backend:", fallbackText);
        toast.error(
          "Unexpected server response. Check if backend is returning valid JSON."
        );
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Signup failed. Try again.");
        return;
      }

      toast.success("✅ Signup successful! Awaiting approval.");
      setFormData({
        name: "",
        email: "",
        password: "",
        membership_type: "general",
        motivation: "",
      });
    } catch (err) {
      console.error("❌ Signup error:", err);
      toast.error("Could not reach the server. Is it running on port 5050?");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/celeb_back.jpeg')",
      }}
    >
      <div className="flex flex-col items-center bg-black bg-opacity-60 rounded-2xl p-10 shadow-2xl max-w-md w-full">
        <img
          src="src/assets/clublogo.png"
          alt="Nepalese Stars NRW Logo"
          className="w-20 h-20 mb-4"
        />
        <h2 className="text-yellow-400 text-3xl font-bold mb-6">Team Signup</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-1">
              Membership Type
            </label>
            <select
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800"
            >
              <option value="general">General</option>
              <option value="player">Player</option>
              <option value="honorary">Honorary</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm mb-1">
              Why do you want to join?
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full px-4 py-2 h-24 resize-none rounded-lg bg-white text-gray-800"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
