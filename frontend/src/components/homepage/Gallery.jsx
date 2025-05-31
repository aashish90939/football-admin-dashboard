import React from "react";

const images = [
  {
    src: "src/assets/Gallery/traininggallery.jpg",
    alt: "Training session",
    caption: "Training Day Vibes",
  },
  {
    src: "src/assets/Gallery/OurCricketTeam.jpg",
    alt: "Cricket team photo",
    caption: "Our Cricket Team",
  },
  {
    src: "src/assets/Gallery/FirstEverTrophyWin.jpg",
    alt: "First ever trophy ",
    caption: "First ever trophy ,came 3rd in NRNA Cup",
  },
  {
    src: "src/assets/Gallery/FlexingAwayjersey.jpg",
    alt: "Flexing away jersey",
    caption: "Flexing Away Jersey",
  },
  {
    src: "src/assets/Gallery/TeamDinner.jpg",
    alt: "Award ceremony",
    caption: "Team Dinner",
  },
  {
    src: "src/assets/Gallery/celebrationAfterNRNAWin.jpg",
    alt: "Celebration after NRNA Cup win",
    caption: "NRNA Cup Victory 2023",
  },
  {
    src: "src/assets/Gallery/Belgium Squad.jpg",
    alt: "International match moment",
    caption: "Belgium Gold Cup 2023",
  },
  {
    src: "src/assets/Gallery/HochschuleCupMemories.jpg",
    alt: "hochsschule cup memories",
    caption: "Hochsschule Cup Memories",
  },

  {
    src: "src/assets/Gallery/BpnDai.jpg",
    alt: "Sponsored Second Jersey",
    caption: "Sponsored Second Jersey",
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
