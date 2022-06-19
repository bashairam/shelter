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
  DetailsHomeless
} from "./components";

import { useLocation, useParams } from 'react-router'
import AllReport from './components/AllReport';


const root = ReactDOM.createRoot(document.getElementById("root"));
const AllReportsWithProps = () => {
  const { state } = useLocation();
  const { id } = state

  return <AllReport id={id} />
};
const DetailsHomelessWithProps = () => {
  const { state } = useLocation();
  const { id } = state

  return <DetailsHomeless id={id} />
};

const ReportHomelessWithProps = () => {
  const { state } = useLocation();
  const { id, method, report } = state

  return <Report id={id} method={method} report={report} />
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
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<User />} />
          <Route path="/add" element={<Add />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={['מנהל', 'רכז', 'עובד סוציאלי', 'מדריך','אם בית']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportHomelessWithProps />} />
            <Route path="/allreports" element={<AllReportsWithProps />} />
            <Route path="/search/:profileSlug" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['מנהל', 'רכז', 'עובד סוציאלי', 'מדריך','אם בית']} />}>
            <Route path="/updateDetailsHomeless" element={<DetailsHomelessWithProps />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['מנהל']} />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/staff" element={<Staff />} />
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>

);

reportWebVitals();