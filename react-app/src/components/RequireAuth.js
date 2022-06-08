import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = () => {
    const location = useLocation();
    const { currentUser } = useAuth();
 
    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
             currentUser!=null
             
                // ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                ? <Outlet /> 
                : <Navigate to="/login" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;