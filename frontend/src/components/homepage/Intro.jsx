import React from "react";
import Achievements from "./Achievements";

const Intro = () => {
  return (
    <section className="bg-gradient-to-b from-[#0d1117] to-[#111827] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">
            Nepalese Stars NRW - More Than a Club
          </h1>
          <p className="text-lg leading-relaxed text-gray-200">
            Founded in 2015, <strong>Nepalese Stars NRW</strong> stands as a
            vibrant symbol of unity, pride, and passion for the Nepalese
            community in North Rhine-Westphalia, Germany.
          </p>
          <p className="text-lg leading-relaxed text-gray-200">
            From football to cricket, our club thrives on{" "}
            <strong>talent, teamwork, and sportsmanship</strong>. Every match we
            play is a celebration of heritage and shared dreams.
          </p>
          <p className="text-lg leading-relaxed text-gray-200">
            Whether you're a player chasing goals, a fan cheering from the
            sidelines, or someone who simply wants to connect with a passionate
            community — there's a place for you here.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              Membership Categories:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-200">
              <li>
                <strong>Players:</strong> Compete and grow on the field.
              </li>
              <li>
                <strong>General Members:</strong> Support and uplift the team.
              </li>
              <li>
                <strong>Honorary Members:</strong> Recognized contributors to
                our vision.
              </li>
            </ul>
          </div>
          <p className="text-lg leading-relaxed text-gray-200">
            🌟 At Nepalese Stars, <strong>everyone belongs</strong>. No matter
            your background or skill level, you're part of the family.
          </p>
          <p className="text-lg leading-relaxed text-yellow-300 font-semibold">
            Join us — and be part of something bigger. Together, we shine — on
            and off the field.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="src/assets/teamFoto.png"
            alt="Team"
            className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-yellow-400"
          />
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-20">
        <Achievements />
      </div>
    </section>
  );
};

export default Intro;
