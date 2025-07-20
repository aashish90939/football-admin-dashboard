import React from "react";
import Achievements from "./Achievements";

const Intro = () => {
  return (
    <section className="bg-gradient-to-b from-[#0d1117] to-[#111827] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight">
              Nepalese Stars NRW
              <br />
              <span className="text-white text-2xl block mt-1">
                More Than a Club
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              Founded in <strong>2015</strong>,{" "}
              <strong>Nepalese Stars NRW</strong> stands as a vibrant symbol of{" "}
              <span className="text-yellow-300">unity, pride, and passion</span>{" "}
              for the Nepalese community in North Rhine-Westphalia, Germany.
            </p>
          </header>

          <div className="space-y-4">
            <p className="text-lg text-gray-200">
              From football to cricket, our club thrives on{" "}
              <strong>talent, teamwork, and sportsmanship</strong>. Each match
              we play is a celebration of heritage and dreams.
            </p>
            <p className="text-lg text-gray-200">
              Whether you're chasing goals, cheering from the sidelines, or
              seeking community, there's a place for you here.
            </p>
          </div>

          {/* Membership Box */}
          <div className="bg-[#1f2937] border-l-4 border-yellow-400 p-6 rounded-lg shadow-inner space-y-4">
            <h3 className="text-xl font-semibold text-yellow-300">
              Membership Categories:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
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

          <div className="space-y-3">
            <p className="text-lg text-gray-200">
              🌟 At Nepalese Stars, <strong>everyone belongs</strong>. No matter
              your background or skill level, you're part of the family.
            </p>
            <p className="text-lg font-semibold text-yellow-300">
              Join us — and be part of something bigger. Together, we shine — on
              and off the field.
            </p>
          </div>
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
      <div className="mt-24"></div>
    </section>
  );
};

export default Intro;
