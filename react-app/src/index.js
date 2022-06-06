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
  Report
} from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />

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