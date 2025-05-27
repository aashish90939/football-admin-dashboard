import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};

export default RequireAdmin;
