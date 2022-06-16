import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { firestore } from "../../firebase"
import "./Search.css"
import axios from 'axios'
import {ExportCSV} from './ExportCSV'



export function Search() {
  const navigate = useNavigate();
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore, "homelesses");
  const [checked, setChecked] = useState("");
  const [file , setFile] = useState("");
  const [exportExel , setExportExel] = useState([]);
  
  useEffect(() => {
    const getHomeless = async () => {
      const data = await getDocs(col)
      setHomeless(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getHomeless();
    setFile("myFile")
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

  const handleClickAll = (e) => {
    window.location.reload();
  }
let saveItem = [];
let copyItem;
  const tableFil =(item) =>{
   
    if(!saveItem.includes(item)){
      copyItem={
      "שם הצעיר": item.name, 
      "תז": item.id,
      "גיל": item.age ,
      "עיר מגורים" : item.parentsAddress,
      "מספר טלפון" : item.personalPhone,
      "מסודות שהיה בהן בעבר" : item.nameOf_prominent_institutions,
      "רקע כללי" :  item.background,
      "רקע פלילי":  item.criminalRecord,
      "רקע התמכרותי": item.addiction_History,
      "רקע פסיכיאטרי": item.psycoticPast,
      "תאריך הכנסה" : item.date,
      "תאריך היציאה": item.exitDate
      }
      saveItem.push(copyItem)
    }      
     return( 
     
      <tr key={item.id} >             
      <td><button className="view" onClick={() => { 
       navigate(`/search/${item.id}`)
       }}>
        פרטים</button></td>
       <td>{item.nameOf_prominent_institutions}</td>  
       <td>{item.parentsAddress}</td>
       <td>{item.age}</td>
       <td>{item.id}</td>
       <td>{item.name}</td>
     </tr>
   )
  }
  
  return (
    <div className="row height saveItem-flex justify-content-center align-items-center my-5">
      <div className="col-md-10">
        <div className="search">
          <i className="fa-fa-search"></i>
      
          <div className="ms-auto me-auto saveItem-flex col-md-6">
            <ExportCSV csvData={saveItem} fileName={file} />
            <DropdownButton
              id="dropdown1"
              variant="secondary"
              title="סנן לפי"
              className="dropdown dropleft"
              size ="sm"
              border = '#f30bcc'

            >
              <Dropdown.Item  >
              <button className ="btn2"onClick={handleClickPsycotic}>רקע פסיכיאטרי </button >

              </Dropdown.Item>
              <Dropdown.Item > 
              <button  className ="btn2" onClick={handleClickCriminal}>רקע פלילי</button >
              </Dropdown.Item>

              <Dropdown.Item >
              <button className ="btn2" onClick={handleClickAddiction}>רקע התמכרותי</button >
              </Dropdown.Item>
              
              <Dropdown.Item >
              <button  className ="btn2" onClick={handleClickAll}>כל הצעירים</button >
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
                    <th></th>
                    <th>מסודות שהיה בהן בעבר</th>
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
                      const homelessId = item.ID && String(item.ID).includes(search)
                      const homelessPastEstablishment = item.nameOf_prominent_institutions && item.nameOf_prominent_institutions.includes(search)
                
                      if (checked ==="psycotic" && !item.psycoticPast) {
                        return false;
                      }
                      if (checked=== "criminal" && !item.criminalRecord) {
                        return false;
                      }
                      if (checked=== "addiction" && !item.addiction_History) {
                        return false;
                      }
                      if (homelessName || homelessAddress || homelessAge || homelessId || homelessPastEstablishment) {
                        return item
                      }
                      if (search === "") {
                        return item
                      }
                    }).map(item => tableFil(item)
                    )

                  }
                    
                    
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