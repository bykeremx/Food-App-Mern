import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthCustom.jsx"

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  const user = state.user;

//   return user ? children : <Navigate to="/login" replace />;

  if(!user){
    return <Navigate to="/login" replace />;
  }
  if(user){
    return children;
  }
};

export default ProtectedRoute;