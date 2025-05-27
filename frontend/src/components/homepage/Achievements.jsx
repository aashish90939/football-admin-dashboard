import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "🏆 NRNA Cup 2023 — Champions",
      description:
        "An unforgettable victory at the NRNA Cup 2023, where unity, skill, and determination led us to glory.",
      image: "src/assets/NRNAcup2023.jpg",
    },
    {
      id: 2,
      title: "🏆 Berlin Cup 2022 — Champions",
      description:
        "Clinched the Berlin Cup 2022, showcasing our relentless spirit and tactical brilliance.",
      image: "src/assets/BerlinCup.png",
    },
    {
      id: 3,
      title: "🥈 Belgium Gold Cup 2023 — Runners-up",
      description:
        "Proud runners-up in our first international tournament. A historic milestone in Belgium!",
      image: "src/assets/BelgiumCup.jpeg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section className="bg-[#0d1117] py-16 px-4 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-10">
          🏅 Our Achievements
        </h2>
        <Slider {...settings}>
          {achievements.map((item) => (
            <div key={item.id} className="px-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="p-6 text-left bg-white text-gray-800">
                  <h3 className="text-2xl font-bold text-blue-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-md text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Achievements;
