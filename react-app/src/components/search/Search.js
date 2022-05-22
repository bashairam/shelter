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

     
  // const filteredPerson = !search.length ? homeless : homeless.filter(person => person.address.includes(search));
  //  const filter= value =>{

           
  //  }
    
   return(
     
    <div className="row height d-flex justify-content-center align-items-center">

    <div className="col-md-8">

      <div className="search">
        <i className="fa fa-search"></i>

        <input 
          type="text"
          className="form-control"
          placeholder="חיפוש"
          onChange = {(event) => {
          setSearch(event.target.value)
         }}/>
         <button className="btn btn-primary">חיפוש</button>



     <div className="form-group">
         <br />
  
      <div className="table-t" >
        <label
            className="fLabels"
            style={{ float: "right" }}
            htmlFor="description"
        >
        </label>

        <table className="table table-bordered">

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
       //const homelessAddress = item.address.includes(search)
       //const homelessAge = item.age.includes(search)
       //const homelessId = item.ID.includes(search)
       // const homelessMentor = item.mentor.includes(search)
    
        if(search === ""){
          return item
        }
        else if( homelessName )
        {
          return item
        }
     
     }).map(item=>
      <tr key = "item.id">
      <td>{item.status}</td>
      <td>{item.pastCorporation}</td>
      <td>{item.supportiveBackground}</td>
      <td>{item.psychiatricBackground}</td>
      <td>{item.mentor}</td>
      <td>{item.address}</td>
      <td>{item.age}</td>
      <td>{item.id}</td>
      <td>{item.name}</td>
       
       
      
      
      
       


       
      

     </tr>
     
     )}
            </tbody>
            <br /><br />
      <br /><br />
     
        </table>
    </div>
   

</div>


   </div>
   </div>
                        
                        </div>
         

   )
 }
export default Search;

