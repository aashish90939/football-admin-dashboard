import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState(""); // state for email
  const [password, setPassword] = useState(""); // state for password
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.clone().json();
      } catch (jsonErr) {
        const fallbackText = await res.text();
        console.error("Non-JSON login response:", fallbackText);
        toast.error("Unexpected server response during login.");
        return;
      }

      if (!res.ok) {
        toast.error(data.error || "Login failed.");
        return;
      }

      toast.success("✅ Login successful!");

      localStorage.setItem("authToken", data.token);
      // Optionally store user info too
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard"); // or whatever page after login
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server connection failed.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/celeb_back.jpeg')" }}
    >
      <div className="flex flex-col items-center bg-black bg-opacity-60 rounded-2xl p-10 shadow-2xl max-w-sm w-full">
        <img
          src="src/assets/clublogo.png"
          alt="Nepalese Stars NRW Logo"
          className="w-24 h-24 mb-6"
        />
        <h1 className="text-yellow-400 text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-200"
          >
            LOG IN
          </button>
          <div className="mt-4 text-center">
            <p className="text-white text-sm">
              Not a member?{" "}
              <Link
                to="/signUp"
                className="text-yellow-400 font-semibold hover:underline"
              >
                Become a member
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
