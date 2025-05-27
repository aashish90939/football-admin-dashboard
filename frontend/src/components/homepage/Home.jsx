import React from "react";
import { useNavigate } from "react-router-dom";
import videoSrc from "../../assets/highlightbelgium.mp4";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      {/* Full-Screen Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full object-cover brightness-75 z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Nepalese Stars NRW
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white max-w-2xl drop-shadow">
          Blue and Yellow Army
        </p>
        <div className="mt-8 flex gap-4">
          <button
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
            onClick={() => navigate("/about")}
          >
            Explore
          </button>
          <button
            className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
            onClick={() => navigate("/contact")}
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
