import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Search,
  Add,
  User,
  Login,
  Profiles,
  Profile,
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />}>
        <Route path="" element={<Profiles />} />
        <Route path=":profileSlug" element={<Profile />} />
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

