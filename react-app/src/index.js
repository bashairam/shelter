import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  Search,
  Add,
  User,
  Login,
  Profiles,
  Profile,
  SignUp,
  Staff,
  Report,
  DetailsHomeless
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/updateDetailsHomeless" element={<DetailsHomeless />} />

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

  </Router>,

  document.getElementById("root")
);