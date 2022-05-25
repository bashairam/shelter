import { collection ,getDocs } from "firebase/firestore";
import React, {useState , useEffect, useReducer} from "react";
import {firestore} from "../../firebase"
import "./Search.css"


function Search() {
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore , "homelesses");
  useEffect(() => {
      const getHomeless = async () => {
      const data = await getDocs(col)
      setHomeless(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

    getHomeless();
   },[]); 
   return(   
  <div className="row height d-flex justify-content-center align-items-center my-5">
    <div className="col-md-10">
      <div className="search">
        <i className="fa fa-search"></i>
        <div className="ms-auto me-auto d-flex col-md-6">
          <button style={{backgroundColor : '#343741', color : 'white'}} className="btn btn-primary">חיפוש</button>
          <input 
            type="text"
            className="form-control"
            placeholder="חיפוש"
            onChange = {(event) => {
            setSearch(event.target.value)
          }}/>
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
    
            <div style={{textAlign:'center'}}>
              <table className="table ">
                <thead>
                  <tr >
                    <th>סטטוס</th>
                    <th>מסדות שהיה בהם בעבר</th>
                    <th>רקע התמכותי</th>
                    <th>רקע פסיכיאטרי</th>
                    <th>עובד סוציאלי מלווה</th>
                    <th>עיר מגורים</th>
                    <th>גיל</th>
                    <th>ת.ז</th>
                    <th>שם</th>          
                  </tr>
                </thead>
              <tbody>
                { 
                  homeless.filter((item) => {
                    const homelessName = item.name.includes(search)
                
                    if(search === ""){
                      return item
                    }
                    else if( homelessName )
                    {
                      return item
                    }
                
                }).map(result=>
                  <tr key = {result.id}>
                    <td>{result.status}</td>
                    <td>{result.pastCorporation}</td>
                    <td>{result.supportiveBackground}</td>
                    <td>{result.psychiatricBackground}</td>
                    <td>{result.mentor}</td>
                    <td>{result.address}</td>
                    <td>{result.age}</td>
                    <td>{result.id}</td>
                    <td>{result.name}</td>
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

