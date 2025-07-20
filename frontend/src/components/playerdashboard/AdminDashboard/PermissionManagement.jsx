import React, { useState } from "react";

const PermissionManagement = () => {
  const [membershipType, setMembershipType] = useState("");
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);

  const handleMembershipChange = (e) => {
    const selectedType = e.target.value;
    setMembershipType(selectedType);

    // Update role and permissions based on membership type
    if (selectedType === "Basic") {
      setRole("Viewer");
      setPermissions(["View"]);
    } else if (selectedType === "Premium") {
      setRole("Editor");
      setPermissions(["View", "Edit"]);
    } else if (selectedType === "Admin") {
      setRole("Administrator");
      setPermissions(["View", "Edit", "Delete"]);
    }
  };

  return (
    <div>
      <h2>Permission Management</h2>
      <div>
        <label htmlFor="membershipType">Membership Type:</label>
        <select
          id="membershipType"
          value={membershipType}
          onChange={handleMembershipChange}
        >
          <option value="">Select Membership Type</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div>
        <h3>Role: {role}</h3>
        <h4>Permissions:</h4>
        <ul>
          {permissions.map((permission, index) => (
            <li key={index}>{permission}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PermissionManagement;
