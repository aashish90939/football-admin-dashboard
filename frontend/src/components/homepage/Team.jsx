import React from "react";
import { usePlayers } from "../../context/PlayersContext";

const Team = () => {
  const { enrichedPlayers, loading } = usePlayers();

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d1117] to-[#1f2937] text-white">
        <p>Loading members...</p>
      </section>
    );
  }

  const generalMembers = enrichedPlayers.filter(
    (p) => p.membership_type === "general"
  );
  const playerMembers = enrichedPlayers.filter(
    (p) => p.membership_type === "player"
  );
  const honoraryMembers = enrichedPlayers.filter(
    (p) => p.membership_type === "honorary"
  );

  const renderMemberGrid = (members) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-12">
      {members.map((player, index) => {
        const imageUrl = player.photo_base64
          ? `data:image/jpeg;base64,${player.photo_base64}`
          : `/assets/default-player.png`;

        return (
          <div
            key={index}
            className="bg-white rounded-xl p-4 text-center shadow-md transition-transform transform hover:scale-105 border-2 border-transparent hover:border-yellow-400"
          >
            <img
              src={imageUrl}
              alt={player.name}
              className="w-20 h-20 mx-auto object-cover rounded-full border-4 border-blue-200 mb-3"
            />
            <h3 className="text-md font-semibold text-blue-900">
              {player.name}
            </h3>
            <p className="text-gray-700 text-xs capitalize mt-1">
              {player.role}
            </p>
            {player.position && (
              <p className="text-xs text-gray-600">
                #{player.jersey_number} • {player.position}
              </p>
            )}
            <span className="inline-block mt-2 px-2 py-0.5 text-[10px] rounded-full font-semibold bg-yellow-200 text-yellow-800 uppercase tracking-wide">
              {player.membership_type}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1f2937] py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-yellow-400 mb-12">
          Meet Our Members
        </h1>

        {playerMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-yellow-300 mb-4">Players</h2>
            {renderMemberGrid(playerMembers)}
          </>
        )}

        {generalMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-yellow-300 mb-4">
              General Members
            </h2>
            {renderMemberGrid(generalMembers)}
          </>
        )}

        {honoraryMembers.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-yellow-300 mb-4">
              Honorary Members
            </h2>
            {renderMemberGrid(honoraryMembers)}
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
