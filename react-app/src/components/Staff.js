import React, { useState } from "react";
import useFetch from "./useFetch";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import LoadingScreen from 'react-loading-screen';
import { getAuth, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import userEvent from "@testing-library/user-event";

const Staff = () => {

  const { isPending, data: staffList } = useFetch('users');
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  //const auth = getAuth();
 // const user = auth.currentUser;
 //const admin = require('./firebase_admin');

  const handleDelete = async (id) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה למחוק את העודב ממערכת")) {

       const docRe = doc(firestore, "users",id) 
       await deleteDoc(docRe)
        
      await deleteUser(userEvent)
    }
    window.location.reload(false);
    navigate("/staff");

  }
  return (
    <div className="row height d-flex justify-content-center align-items-center my-5">
      <div className="col-md-10">
        <div className="search">
          <i className="fa fa-search"></i>
          <div className="col-md-6 me-auto ms-auto  d-flex " style={{ minWidth: '500px' }} >
            <input
              type="text"
              className="form-control"
              placeholder=" חיפוש לפי : שם / מספר טלפון / מייל"
              onChange={(event) => {
                setSearch(event.target.value)
              }} />
          </div>
          <Link to="/signup">
            <button className="me-0" style={{ display: 'block' }}>הוספת איש צוות</button>
          </Link>
          <div className="form-group">
            <br />
            <div className="table-t" >
              <label
                className="fLabels"
                style={{ float: "right" }}
                htmlFor="description">
            </label>
          </div>
            
            <div style={{textAlign:'center'}}>
              <table className="table ">
                <thead>
                  <tr >
                    <th>הוצאת עובד</th>
                    <th>תפקיד</th>
                    <th>טלפון</th>
                    <th>מייל</th>
                    <th>שם</th>
                  </tr>
                </thead>
                {
                    isPending && <LoadingScreen loading={true}
                    bgColor='#f1f1f1'
                    spinnerColor='rgb(247, 116, 9)'
                    textColor='#rgba(0, 0, 0, 0.877)'
                    text='...טוען'> </LoadingScreen>
                  
                  }   
              <tbody>
                { 
                
                  staffList.filter((item) => {
                    const staffName = item.parentsAddress && item.fname.includes(search)
                    const phoneNumber = item.phoneNumber && String(item.phoneNumber).includes(search)
                    const mail = item.email && item.email.includes(search)
                
                
                    if(search === ""){
                      return item
                    }
                    else if( staffName || phoneNumber|| mail)
                    {
                      return item
                    }
                
                }).map(result=>
                  <tr key = {result.id}>
                    <td><button  className="delete bi bi-person-x" onClick={() => { handleDelete(result.id) }} >
                          </button></td>
                    <td>{result.type}</td>
                    <td>{result.phoneNumber}</td>
                    <td>{result.email}</td>
                    <td>{result.fname}</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Staff;