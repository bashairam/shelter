// import React from 'react'
// import { AuthProvider} from "./AuthProvider";
// import { Navigate, Outlet } from 'react-router-dom'
// // import { useAuth } from "./use-auth.js";

// // const PrivateRoute = ({ component: Component, ...rest }) => {

// //   // Add your own authentication on the below line.
// //   const isLoggedIn = AuthProvider.isLoggedIn()

// //   return (
// //     <Route
// //       {...rest}
// //       render=
// //       {props =>
// //         {return isLoggedIn ? (
// //           <Component {...props} />
// //         ) : (
// //           <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
// //         )
// //       }
// //       }/>
// //   )
// // }
// // const PrivateRoute = () => {
// //     const auth = null; // determine if authorized, from context or however you're doing it

// //     // If authorized, return an outlet that will render child elements
// //     // If not, return element that will navigate to login page
// //     return auth ? <Outlet /> : <Navigate to="/login" />;
// // }

// function PrivateRoute({ children }) {
//     // const auth = useAuth();
//     // return auth ? children : <Navigate to="/login" />;
//   }
// export default PrivateRoute