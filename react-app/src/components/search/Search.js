import React from "react";
import { Outlet } from "react-router-dom";

function Search() {
  return (
    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Search page</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Search;