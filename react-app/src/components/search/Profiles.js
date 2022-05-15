import React from "react";
import { Link } from "react-router-dom";

function Profiles() {
  return (
    <div className="home">
      <div className="container">
        <Link to="/search/this-is-a-profile-title">
          <div className="row align-items-center my-5">
            <div className="col-lg-5">
              <h1 className="font-weight-light">This is a profile title</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Profiles;