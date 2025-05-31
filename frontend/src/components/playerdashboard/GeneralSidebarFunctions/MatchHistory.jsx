import React from "react";

const MatchHistory = () => {
  const matches = [
    { id: 1, opponent: "Team A", date: "2023-10-01", result: "Win" },
    { id: 2, opponent: "Team B", date: "2023-10-08", result: "Loss" },
    { id: 3, opponent: "Team C", date: "2023-10-15", result: "Draw" },
  ];

  return (
    <div>
      <h2>Match History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Opponent</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>{match.opponent}</td>
              <td>{match.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchHistory;
