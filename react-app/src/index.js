import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
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
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<ReportHomelessWithProps />} />
      {/* <Route path="/allreports" element={<AllReport />} /> */}
      <Route path="/allreports" element={<AllReportsWithProps/>} />

      <Route path="/updateDetailsHomeless" element={<DetailsHomelessWithProps />}  />
      <Route path="/inputData" element={<InputData />} />
      <Route path="/add" element={<Add />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/search" element={<Search />}>
        {/* <Route path="" element={<Profiles />} /> */}
      </Route>
        <Route path="/search/:profileSlug" element={<Profile />} />
    </Routes>

  </Router>
  </AuthProvider>
  </React.StrictMode>

);

reportWebVitals();