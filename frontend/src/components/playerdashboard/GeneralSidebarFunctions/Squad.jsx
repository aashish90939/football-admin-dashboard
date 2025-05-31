import React from "react";
import { usePlayers } from "../../../context/PlayersContext";

const Squad = () => {
  const { enrichedPlayers, loading } = usePlayers();

  const categorized = {
    Goalkeeper: [],
    Defender: [],
    Midfield: [],
    Forward: [],
  };

  enrichedPlayers
    .filter((p) => p.membership_type === "player" && p.status === "accepted")
    .forEach((player) => {
      if (categorized[player.position]) {
        categorized[player.position].push(player);
      }
    });

  const renderPlayers = (position) => (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-yellow-300 mb-6 text-center underline underline-offset-4 decoration-yellow-500">
        {position}s
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categorized[position].map((player) => {
          const imageUrl = player.photo_base64
            ? `data:image/jpeg;base64,${player.photo_base64}`
            : `/assets/default-player.png`;

          return (
            <div
              key={player.id}
              className="bg-white text-gray-900 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1 border-t-4 border-yellow-400"
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={imageUrl}
                  alt={player.name}
                  className="w-24 h-24 object-cover rounded-full border-4 border-blue-400 shadow-md"
                />
                <h4 className="text-xl font-bold text-blue-800">
                  {player.name}
                </h4>
                <p className="text-sm text-gray-600">
                  #{player.jersey_number}{" "}
                  {player.sub_role && ` - ${player.sub_role}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading squad...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-14 text-center tracking-wide">
          🏆 Squad
        </h2>

        {Object.keys(categorized).map((position) =>
          categorized[position].length > 0 ? renderPlayers(position) : null
        )}
      </div>
    </section>
  );
};

export default Squad;
