import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "worker") return <Navigate to="/workerDashboard" replace />;
  return <Navigate to="/userDashboard" replace />;
};

export default Dashboard;