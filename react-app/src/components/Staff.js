import React, { useState } from "react";
import useFetch from "./useFetch";
import { collection, getFirestore, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { Link } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const Staff = () => {

  const { isPending, data: staffList } = useFetch('users');
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const handleDelete = async (id) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה למחוק את העודב ממערכת")) {

       const docRe = doc(firestore, "users",id) 
       await deleteDoc(docRe)
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
            <button style={{ backgroundColor: '#343741', color: 'white' }} className="btn btn-primary">חיפוש</button>
            <input
              type="text"
              className="form-control"
              placeholder="חיפוש"
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

            <div style={{ textAlign: 'center' }}>
              <table className="table ">
                <thead>
                  <tr >
                    <th>הוצאת עודב</th>
                    <th>תפקיד</th>
                    <th>טלפון</th>
                    <th>מייל</th>
                    <th>שם</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    staffList.filter((item) => {
                      const staffName = item.fname.includes(search)

                      if (search === "") {
                        return item
                      }
                      else if (staffName) {
                        return item
                      }

                    }).map(result =>
                      <tr key={result.id}>
                        <td><button className="delete" onClick={() => { handleDelete(result.id) }} >
                          להוציא</button></td>
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

