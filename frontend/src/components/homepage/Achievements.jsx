import React from "react";

const achievements = [
  {
    id: 1,
    title: "🏆 Berlin Cup 2022 — Champions",
    description:
      "Clinched the Berlin Cup 2022, showcasing our relentless spirit and tactical brilliance.",
    image: "src/assets/BerlinCup.png",
  },
  {
    id: 2,
    title: "🏆 NRNA Cup 2023 — Champions",
    description:
      "An unforgettable victory at the NRNA Cup 2023, where unity, skill, and determination led us to glory.",
    image: "src/assets/NRNAcup2023.jpg",
  },
  {
    id: 3,
    title: "🥈 Belgium Gold Cup 2023 — Runners-up",
    description:
      "Proud runners-up in our first international tournament. A historic milestone in Belgium!",
    image: "src/assets/BelgiumCup.jpeg",
  },
];

const AchievementsTimeline = () => {
  return (
    <section className="bg-[#0d1117] py-16 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 text-center mb-14">
          🏅 Our Achievements Timeline
        </h2>
        <div className="relative border-l border-yellow-400 ml-4">
          {achievements.map((item, index) => (
            <div key={item.id} className="mb-12 ml-6 relative">
              <span className="absolute -left-4 top-2 w-8 h-8 rounded-full bg-yellow-400 border-4 border-white"></span>
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center gap-6`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-blue-400">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsTimeline;
