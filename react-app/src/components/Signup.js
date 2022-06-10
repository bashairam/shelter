import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import './Form.css' 
import { collection,addDoc,setDoc,doc } from "firebase/firestore";
import { async } from "@firebase/util";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  const handleSubmit =  (e) => {
    e.preventDefault();
    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
         
           setDoc(doc(firestore, "users", auth.lastNotifiedUid), 
          {
          fname: name,
          email: email,
          phoneNumber: phone,
          type:type
        }
          );

        
        })
        .catch((error) => console.log(error)).then(()=>{navigate("/staff");})
        .then(()=>{ alert("המשתמש נוסף בהצלחה");})
    }

      onRegister();
    


    //  addDoc(doc(firestore, "users"), {
    //   fname: name,
    //   email: email,
    //   phoneNumber: phone,
    //   type:type
    // });
    

  };

  return (
    <div className="text-end">
    <div className="mx-auto">
      <div className="login my-5">
          <h1 className="font-weight-light">: הוספת איש צוות</h1>
      <form className="signupForm" onSubmit={handleSubmit}> 
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="שם מלא"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
         </div> 
         <div className="mb-3"> 
        <input
          className="form-control"
          placeholder="דוא״ל"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        ></input>
        </div> 
         <div className="mb-3"> 
          <input
            className="form-control"
            placeholder="טלפון"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            required
          ></input>
        </div> 
        <div className="mb-3"> 
            <select required className="form-control"
              onChange={(e) => setType(e.target.value)}>
              <option value=''>בחר תפקיד</option>
              <option value="מדריך">מדריך</option>
              <option value="צוות איתור">צוות איתור</option>
              <option value="מנהל">מנהל</option>
              <option value="רכז">רכז</option>
              <option value="עובד סוציאלי">עובד סוציאלי</option>
              <option value="אם בית">אם בית</option>

            </select>
        </div> 
         <div className="mb-3"> 
        <input
          className="form-control"
          placeholder="סיסמא"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
         </div> 
         <div className="d-grid">
            <button type="submit" className="btn btn-primary">הוספה</button>
         </div>   
      </form>
      </div>
    </div>
  </div>
  );
};

export default SignUp;