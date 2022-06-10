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

import {useLocation} from 'react-router'
import AllReport from './components/AllReport';

const root = ReactDOM.createRoot(document.getElementById("root"));
const AllReportsWithProps = () => {
  const {state} = useLocation();
  const { id } = state

  return <AllReport id = {id} /> 
};
const DetailsHomelessWithProps = () => {
  const {state} = useLocation();
  const { id } = state

  return <DetailsHomeless id = {id} /> 
};

const ReportHomelessWithProps = () => {
  const {state} = useLocation();
  const { id } = state

  return <Report id = {id} /> 
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
<<<<<<< HEAD
      <Route path="/report" element={<Report />} />
      <Route path="/updateDetailsHomeless" element={<IntroRedirect />}  />
=======
      <Route path="/report" element={<ReportHomelessWithProps />} />
      {/* <Route path="/allreports" element={<AllReport />} /> */}
      <Route path="/allreports" element={<AllReportsWithProps/>} />

      <Route path="/updateDetailsHomeless" element={<DetailsHomelessWithProps />}  />
>>>>>>> jobehay-main
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