import { collection ,getDocs } from "firebase/firestore";
import React, {useState , useEffect} from "react";
import {firestore} from "../../firebase"
import "./Search.css"
import { Link, Outlet,  useNavigate } from "react-router-dom";



function Search() {
  const navigate = useNavigate();

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
                    const homelessAddress = item.Address && item.Address.includes(search)
                    const homelessAge = item.age && String(item.age).includes(search)
                    const homelessId = item.ID && String(item.ID).includes(search)
                    const homelessMentor = item.mentor && item.mentor.includes(search)
                
                    if(search === ""){
                      return item
                    }
                    else if( homelessName )
                    {
                      return item
                    }
                
                }).map(item =>
                  <tr key={item.id} >
                    {/* { <button onClick={() => {
                          navigate(`/search/${item.id}`)
                     }
                    }>
                   gooo
                    </button> */}
                    <Link to={`/search/${item.id}`}> 
                    <td>{item.status}</td>
                    <td>{item.pastCorporation}</td>
                    <td>{item.supportiveBackground}</td>
                    <td>{item.psychiatricBackground}</td>
                    <td>{item.mentor}</td>
                    <td>{item.Address}</td>
                    <td>{item.age}</td>
                    <td>{item.ID}</td>
                    <td>{item.name}</td>








                </Link>
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

