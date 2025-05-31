import { createContext, useContext, useEffect, useState } from "react";

const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [acceptedPlayers, setAcceptedPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [enrichedPlayers, setEnrichedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAcceptedPlayers = async () => {
    try {
      const res = await fetch("/api/users/accepted");
      const data = await res.json();
      setAcceptedPlayers(data);
    } catch (error) {
      console.error("Failed to fetch accepted players:", error);
    }
  };

  const fetchAllPlayers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllPlayers(data);
    } catch (error) {
      console.error("Failed to fetch all players:", error);
    }
  };

  const fetchEnrichedPlayers = async () => {
    // Fetching enriched profiles with additional data
    try {
      const res = await fetch("/api/users/full-profiles");
      const data = await res.json();
      setEnrichedPlayers(data);
    } catch (error) {
      console.error("Failed to fetch enriched player profiles:", error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchAcceptedPlayers(),
        fetchAllPlayers(),
        fetchEnrichedPlayers(),
      ]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        acceptedPlayers,
        allPlayers,
        enrichedPlayers,
        loading,
        refreshPlayers: async () => {
          setLoading(true);
          await Promise.all([
            fetchAcceptedPlayers(),
            fetchAllPlayers(),
            fetchEnrichedPlayers(),
          ]);
          setLoading(false);
        },
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};
