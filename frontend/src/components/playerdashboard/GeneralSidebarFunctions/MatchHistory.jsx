import React from "react";

const dummyResults = [
  {
    id: 1,
    opponent: "Team Alpha",
    date: "2025-07-10",
    result: "Win",
    score: "3-1",
  },
  {
    id: 2,
    opponent: "Team Beta",
    date: "2025-07-15",
    result: "Loss",
    score: "0-2",
  },
  {
    id: 3,
    opponent: "Team Gamma",
    date: "2025-07-20",
    result: "Draw",
    score: "2-2",
  },
];

const MatchHistory = () => (
  <div>
    <h2>Past Results</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Opponent</th>
          <th>Result</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {dummyResults.map((match) => (
          <tr key={match.id}>
            <td>{match.date}</td>
            <td>{match.opponent}</td>
            <td>{match.result}</td>
            <td>{match.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MatchHistory;
