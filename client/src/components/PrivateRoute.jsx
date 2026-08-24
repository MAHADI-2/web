import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
    const { userInfo } = useAuth();
    return userInfo ? <Navigate to="/" /> : <Navigate to="/login" />
   
};

export default PrivateRoute;