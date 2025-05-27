import React, { useState } from "react";

const AttendanceRecord = () => {
  const [attendance, setAttendance] = useState([
    { date: "2023-10-01", status: "Present" },
    { date: "2023-10-02", status: "Absent" },
    { date: "2023-10-03", status: "Present" },
  ]);

  return (
    <div
      style={{ padding: "20px", backgroundColor: "#f0f4f8", minWidth: "500px" }}
    >
      <h2
        style={{ textAlign: "center", color: "#4A90E2", marginBottom: "20px" }}
      >
        Attendance Record
      </h2>
      <table
        style={{
          width: "80%",
          margin: "0 auto",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#4A90E2", color: "#fff" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#eaf4fc",
              }}
            >
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {record.date}
              </td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecord;
