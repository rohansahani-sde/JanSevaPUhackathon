import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if(role === "citizen")
    return <Navigate to="/" replace />;

//   if (role !== "admin" ) {
//     return <Navigate to="/login" replace />;
//   }

  return children;
};

export default ProtectedRoute;
