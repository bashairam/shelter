import { useState } from "react";
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFetch from "./useFetch";

const RequireAuth = ({allowedRoles}) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');
  const [ready, setReady] = useState(false);

  useEffect(() => {

    console.log(isPending);
    console.log(users);

    // if (!isPending) { setReady(true) }

  }
    , [isPending]);


  return (
    // auth?.roles?.find(role => allowedRoles?.includes(role))

    currentUser != null
      ? !isPending
          ? allowedRoles.includes(users.find((user) => user.id === currentUser.uid).type)
        ? <Outlet />
        : <div>unauthraized</div>


       :<div>loading ...</div>
      // 

      : <Navigate to="/login" state={{ from: location }} replace />

  );
}

export default RequireAuth;