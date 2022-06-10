import { collection,getFirestore, deleteDoc,addDoc, deleteField, getDocs,getDoc,doc ,onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { firestore, getDetailsHomelessesById } from "../../firebase"
import "./Search.css"
import { dblClick } from "@testing-library/user-event/dist/click";
import { Component } from "react";
import 'react-toastify'
import { async } from "@firebase/util";
import { toast } from "react-toastify";

export function Search() {


  const navigate = useNavigate();
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore, "homelesses");
  const [checked, setChecked] = useState("");


  useEffect(() => {
    
    const getHomeless = async () => {
      const data = await getDocs(col)
      setHomeless(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   
   
   
    };

    getHomeless();
  }, []);

  
  


  const handleClickPsycotic = (e) => {
    setChecked("psycotic")
  }
  const handleClickCriminal = (e) => {
    setChecked("criminal")
  }
  const handleClickAddiction = (e) => {
    setChecked("addiction")
  }

 const handleDelete = async (id) => {
       window.confirm("? האם אתה בטוח שאתה רוצה למחוק את הצעיר ממערכת");
      const docRef = doc(firestore,"homelesses",id)
      const docRe = doc(firestore,"inHomelesses",id)
      const docR = doc(firestore,"history",id)

      await deleteDoc(docRef)
      await deleteDoc(docRe)
      await deleteDoc(docR)
      toast.success("הצעיר נמחק בהצלחה!");

      window.location.reload(false);
      navigate('./search'); 
      
    
  
    }



  return (
    <div className="row height d-flex justify-content-center align-items-center my-5">
      <div className="col-md-10">
        <div className="search">
          <i className="fa-fa-search"></i>
          <div className="ms-auto me-auto d-flex col-md-6">
            <DropdownButton
              id="dropdown1"
              variant="secondary"
              menuVariant="light"
              title="סנן לפי"
              className="dropdown dropleft"
              size="sm"
              border='#f30bcc'

            >
              <Dropdown.Item  >
                <a onClick={handleClickPsycotic}>רקע פסיכיאטרי </a>

              </Dropdown.Item>
              <Dropdown.Item >
                <a onClick={handleClickCriminal}>רקע פלילי</a>
              </Dropdown.Item>

              <Dropdown.Item >
                <a onClick={handleClickAddiction}>רקע התמכרותי</a>
              </Dropdown.Item>

            </DropdownButton>

            <input
              type="text"
              className="form-control"
              placeholder="חיפוש"
              onChange={(event) => {
                setSearch(event.target.value)
              }} />
          </div>
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
                    <th>מחיקת צעיר</th>
                    <th>צפה בפרופיל</th>
                    <th>עיר מגורים</th>
                    <th>גיל</th>
                    <th>ת.ז</th>
                    <th>שם</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    homeless.filter((item) => {
                      const homelessName = item.name && item.name.includes(search)
                      const homelessAddress = item.parentsAddress && item.parentsAddress.includes(search)
                      const homelessAge = item.age && String(item.age).includes(search)
                      const homelessId = item.id && String(item.id).includes(search)



                      if (checked === "psycotic" && (item.psycoticPastY_N !== "on")) {
                        return false;
                      }
                      if (checked === "criminal" && (item.criminalRecordY_N !== "on")) {
                        return false;
                      }
                      if (checked === "addiction" && (item.addiction_HistoryY_N !== "on")) {
                        return false;
                      }
                      else if (homelessName || homelessAddress || homelessAge || homelessId) {
                        return item
                      }
                      if (search === "") {
                        return item
                      }
                    }).map(item =>
                      <tr key={item.id} >
                        <td>
                          <button className="delete"  onClick={() => handleDelete(item.id)}>
                            מחק</button></td>
                        <td><button className="view" onClick={() => {
                          navigate(`/search/${item.id}`)
                        }}>
                          פרטים</button></td>
                        <td>{item.parentsAddress}</td>
                        <td>{item.age}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
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
export default Search;