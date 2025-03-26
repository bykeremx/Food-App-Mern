import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthCustom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { state } = useAuth();
  const user = state.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
