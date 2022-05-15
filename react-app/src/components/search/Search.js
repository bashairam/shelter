import React from "react";
import { Outlet } from "react-router-dom";
// import { firestore } from "../../firebase";

function Search({place, data}) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="...חיפוש" />
        <div className="searchIcon"></div>
      </div>
      <div className="dataResult"></div>
      <Outlet />

    </div>
  );

}

export default Search;