import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phoneNumber) {
      alert("Phone number is required!");
      return;
    }
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      reason: "",
      message: "",
    });
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
      {/* Form Side */}
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
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 rounded-lg transition duration-200 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info & Map */}
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
                ["facebook", "https://facebook.com"],
                ["instagram", "https://instagram.com"],
                ["twitter", "https://twitter.com"],
              ].map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition"
                >
                  <img
                    src={`src/assets/${platform}.svg`}
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
