import React from "react";
//import { Outlet } from "react-router-dom";
import { FirebaseApp } from "firebase/app";

function Search({place, data}) {
  return (
    <div className="search">
      <div class="searchInputs">
        <input type="text" placeholder="...חיפוש" />
        <div className="searchIcon"></div>
      </div>
      <div className="dataResult"></div>
    </div>
  );
}

export default Search;