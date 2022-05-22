import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { AuthProvider } from "./AuthProvider";
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
  SignUp,
  Read
} from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/read" element={<Read />}/>
      <Route path="/search" element={<Search />}>
        <Route path="" element={<Profiles />} />
        <Route path=":profileSlug" element={<Profile />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
  </AuthProvider>
  </React.StrictMode>

<<<<<<< HEAD
  document.getElementById("root")
);
=======
);

reportWebVitals();
// ReactDOM.render(
//   <Router>
//     <Navigation />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/add" element={<Add />} />
//       <Route path="/user" element={<User />} />
//       <Route exact path="/login" element={<Login />} />
//       <Route exact path="/signup" element={<SignUp />} />
//       <Route path="/search" element={<Search />}>
//         <Route path="" element={<Profiles />} />
//         <Route path=":profileSlug" element={<Profile />} />
//       </Route>
//     </Routes>
//     <Footer />
//   </Router>,

//   document.getElementById("root")
// );

>>>>>>> 86004ccd1e80b365c95a8790faf32f7eb4eb31ad
