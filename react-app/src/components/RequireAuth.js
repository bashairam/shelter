import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFetch from "./useFetch";

const RequireAuth = ({allowedRoles}) => {

    const {isPending, data: users } = useFetch('users');
    const location = useLocation();
    const { currentUser } = useAuth();




    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        currentUser!=null
        //   ? <div>{console.log(allowedRoles.includes(users.find( (user ) => user.id === currentUser.uid ).type))}</div>

          ? <Outlet /> 
            //  :<div>{alert('unauthrized')}</div>

          : <Navigate to="/login" state={{ from: location }} replace />

                // ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;