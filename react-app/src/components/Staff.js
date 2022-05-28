import React, {useState} from "react";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
const Staff = ()=> {

    const {isPending, data: staffList } = useFetch('users');
    const [search, setSearch] = useState("");


   return(   
  <div className="row height d-flex justify-content-center align-items-center my-5">
    <div className="col-md-10">
      <div className="search">
        <i className="fa fa-search"></i>
            <div className="col-md-6 me-auto ms-auto  d-flex " style={{minWidth : '500px' }} >
          <button style={{backgroundColor : '#343741', color : 'white'}} className="btn btn-primary">חיפוש</button>
          <input 
            type="text"
            className="form-control"
            placeholder="חיפוש"
            onChange = {(event) => {
            setSearch(event.target.value)
          }}/>
          </div>
          <Link to="/signup">
          <button className="me-0" style = {{display : 'block'}}>הוספת איש צוות</button>
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
                
                    if(search === ""){
                      return item
                    }
                    else if( staffName )
                    {
                      return item
                    }
                
                }).map(result=>
                  <tr key = {result.id}>
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

