import React from "react";
import "./User.css"
function User() {
  return (
    <div className="user">
    <form>
       <input className="input"></input>  <a className="text">שם פרטי</a> 
        <br></br>
        <br></br>
        <input className="input"></input> <a className ="text">שם משפחה </a> 
        <br></br>
        <br></br>
        <input className="input"></input> <a className ="text"> כתובת </a> 
         <br></br>
         <br></br>
         <input className="input"></input> <a className ="text"> נייד  </a>
         <br></br>
         <br></br>
         <button>שמירה</button>

    </form>
    </div>
  );
}

export default User;