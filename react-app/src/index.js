import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from "./AuthProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Search,
  Add,
  User,
  Login,
  Staff,
  Profile,
  SignUp,
  Report,
  DetailsHomeless,
  InputData
} from "./components";

import {useLocation,useParams} from 'react-router'

const root = ReactDOM.createRoot(document.getElementById("root"));

const IntroRedirect = () => {
  const { id } = useParams();
  console.log("xxxxxx")
  console.log(useParams());
  return <DetailsHomeless id = {id} /> 
};
// element={<DetailsHomeless id = "asdadasdasdasdasd"/>}
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
    <Navigation />
    <Routes>
      {/* puplic routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />}/>
      <Route path="/user" element={<User />} />
      <Route path="/add" element={<Add />} />

      {/* protected routes */}
      <Route element={<RequireAuth allowedRoles={['מדריך']} />}>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/updateDetailsHomeless" element={<IntroRedirect />}  />
      <Route path="/inputData" element={<InputData />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/search/:profileSlug" element={<Profile />} />
      </Route>

    </Routes>
  </Router>
  </AuthProvider>
  </React.StrictMode>

);

reportWebVitals();