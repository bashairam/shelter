import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        console.log(error.message)
      );
      navigate("/");
    }
    onRegister();
  };

  return (

    <div className="text-end">
    <div className="mx-auto" style={{width: '500px'}}>
      <div className="row align-items-center my-5">
          <h1 className="font-weight-light">כניסה לאיזור האישי</h1>
          <form  onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
        style={{textAlign: 'right'}}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="דוא״ל"
        />
      </div>
      <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="סיסמא"
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <label className="custom-control-label" htmlFor="customCheck1">
            לזכור שנכנסתי
          </label>
          <input
            type="checkbox"
            className="custom-control-input ml-5"
            id="customCheck1"
          />
        </div>
      </div>
      <div className="d-grid">
        <button style={{backgroundColor: '#343741', borderColor : '#343741' }} type="submit" className="btn btn-primary">
          כניסה
        </button>
      </div>
      <p className="forgot-password text-right">
         <a href="./login">? שכחת את הסיסמא</a>
      </p>
    </form>
      </div>
    </div>
  </div>
  );
};

export default LogIn;


