import React, { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import './Form.css'
import useAuth from "../hooks/useAuth";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { currentUser } = useAuth();

  const forgotPassword = () => {
    if(email){
    sendPasswordResetEmail(auth, email)
      .then(function () {
        alert("נשלחה הודעה לכתובת המייל שלך");
      })
      .catch(function (error) {
        console.log(error.message)
        alert("לא נמצא משתמש");
      })}
      else{
        alert("הכנס את כתובת הדוא״ל לשחזור סיסמא");
      }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)

      ).then(() => {

        navigate(from, { replace: true });

      })
    }
    onRegister();

  };

  return (

    !currentUser ? <div className="text-end"  >
      <div className="mx-auto">
        <div className=" login my-5" >
          <h1 className="font-weight-light">כניסה לאיזור האישי</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="דוא״ל"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="סיסמא"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                כניסה
              </button>
            </div>
            <p className="forgot-password text-right">
              <a onClick={forgotPassword}>
                ? שכחת את הסיסמא</a>
            </p>
          </form>
        </div>
      </div>
    </div>
      : <div>{navigate(from, { replace: true })}</div>
  );
};

export default LogIn;


