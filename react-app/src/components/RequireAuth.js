
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFetch from "./useFetch";
import LoadingScreen from 'react-loading-screen';


const RequireAuth = ({allowedRoles}) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');


  return (
    // auth?.roles?.find(role => allowedRoles?.includes(role))

    currentUser != null
      ? !isPending
          ? allowedRoles.includes(users.find((user) => user.id === currentUser.uid).type)
        ? <Outlet />
        : <div>
          {alert('משתמש לא מורשה')}
          {history.back()}
          
        </div>


       :
         <LoadingScreen loading={true}
        bgColor='#f1f1f1'
        spinnerColor='rgb(247, 116, 9)'
        textColor='#rgba(0, 0, 0, 0.877)'
        text='...טוען'> </LoadingScreen>
      
        
      // 

      :<div> {console.log(currentUser)}<Navigate to="/login" state={{ from: location }} replace /></div>

  );
}

export default RequireAuth;