import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber) {
      toast.error("Phone number is required!");
      return;
    }

    if (!formData.reason) {
      toast.error("Reason for contact is required!");
      return;
    }

    if (!formData.message) {
      toast.error("Message is required!");
      return;
    }

    if (!formData.name) {
      toast.error("Name is required!");
      return;
    }

    if (!formData.email) {
      toast.error("Email is required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number (10-15 digits)!");
      return;
    }

    if (!formData.reason.trim()) {
      toast.error("Reason for contact cannot be empty!");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/contact-responses", {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phoneNumber,
        reason: formData.reason,
        message: formData.message,
      });
      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        reason: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{
        backgroundImage: "url('src/assets/celeb_back.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-[#0d1117]/95 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center mb-8">
            <img
              src="src/assets/clublogo.png"
              alt="Club Logo"
              className="w-24 h-24 mb-4 rounded-full border-4 border-yellow-400"
            />
            <h2 className="text-3xl font-bold text-yellow-400 text-center">
              Contact Team Admin
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phoneNumber", "reason"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-white mb-1 capitalize"
                >
                  {field === "phoneNumber" ? "Phone Number" : field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-white mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-yellow-200" : "bg-yellow-400 hover:bg-yellow-300"
              } text-blue-900 font-bold py-3 rounded-lg transition duration-200 shadow-md`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Info Section */}
      <div className="w-full md:w-1/2 bg-[#111827]/90 text-white px-8 py-12">
        <div className="max-w-xl mx-auto space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Get in Touch
            </h3>
            <p className="text-sm mb-1">
              📧 Email:{" "}
              <a
                href="mailto:nepalesestarsnrw@gmail.com"
                className="text-yellow-300 hover:underline"
              >
                nepalesestarsnrw@gmail.com
              </a>
            </p>
            <p className="text-sm">
              📞 Phone:{" "}
              <a
                href="tel:+49123456789"
                className="text-yellow-300 hover:underline"
              >
                +49 123 456789
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              {[
                ["facebook", "https://facebook.com", "facebook.svg"],
                ["instagram", "https://instagram.com", "instagram.svg"],
                ["twitter", "https://twitter.com", "x-twitter.svg"],
              ].map(([platform, url, icon]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img
                    src={`src/assets/${icon}`}
                    alt={platform}
                    className="w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <iframe
              title="Team Location"
              className="w-full h-90 rounded-lg border-2 border-yellow-400 shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.7180763842625!2d6.896298277260372!3d51.48168897180746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8ea0a10b6d343%3A0x5cb7679bf14f33a2!2sSchemmannsfeld%2029%2C%2045359%20Essen!5e0!3m2!1sen!2sde!4v1747769465438!5m2!1sen!2sde"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
