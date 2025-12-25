import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Show nothing (or a spinner) while checking if the user is logged in
  if (loading) return <div>Loading...</div>;

  // If there is no user, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, let them through to the page
  return children;
};

export default ProtectedRoute;
