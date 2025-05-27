import React from "react";

const images = [
  {
    src: "src/assets/gallery1.jpg",
    alt: "Celebration after NRNA Cup win",
    caption: "NRNA Cup Victory 2023",
  },
  {
    src: "src/assets/gallery2.jpg",
    alt: "Training session",
    caption: "Training Day Vibes",
  },
  {
    src: "src/assets/gallery3.jpg",
    alt: "Team huddle before the game",
    caption: "Pre-Match Unity",
  },
  {
    src: "src/assets/gallery4.jpg",
    alt: "Fans cheering the team",
    caption: "Supporters’ Energy",
  },
  {
    src: "src/assets/gallery5.jpg",
    alt: "Award ceremony",
    caption: "Celebrating Excellence",
  },
  {
    src: "src/assets/gallery6.jpg",
    alt: "International match moment",
    caption: "Belgium Gold Cup 2023",
  },
];

const Gallery = () => {
  return (
    <section className="bg-gradient-to-b from-[#0d1117] to-[#1f2937] py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400 text-center mb-12">
          📸 Club Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-yellow-300 text-lg font-semibold text-center px-4">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
