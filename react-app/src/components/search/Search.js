import { collection, deleteDoc, getDocs, doc, setDoc} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { firestore } from "../../firebase"
import "./Search.css"
import 'react-toastify'
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useFetch from "../useFetch";
import Role from "../Role";
import { Link } from "react-router-dom";
import axios from 'axios'
import {ExportCSV} from './ExportCSV'



export function Search() {

  const navigate = useNavigate();
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore, "homelesses");
  const [checked, setChecked] = useState("");

  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');
  const { inhmlsIsPending, data: inHmlsLists } = useFetch('inHomelesses');

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

  const handleDelete = async (id) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה למחוק את הצעיר ממערכת")) {
      const docRef = doc(firestore, "homelesses", id)
      const docRe = doc(firestore, "inHomelesses", id)
      const docR = doc(firestore, "history", id)
      await deleteDoc(docRef)
      await deleteDoc(docRe)
      await deleteDoc(docR)
      toast.success("הצעיר נמחק בהצלחה!");
    }
    window.location.reload(false);
    navigate('./search');
  }
  const handleClickAll = (e) => {
    window.location.reload();
  }


  const [newDate, setNewDate] = useState(0);

  
  const handleDe = async (id,name,age,parentsAddress,nameOf_prominent_institutions,psycoticPast,criminalRecord,
    addiction_History,background,contact,personalPhone,formFiller,referrer,sleepingPlace,therapeutic_history,prominent_institutions
    ) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה להוציא את הצעיר מהשלטר")) {
      const docRe = doc(firestore, "inHomelesses", id)
      await deleteDoc(docRe)
      await setDoc(doc(firestore, "homelesses", id), {
        exitDate: Date(newDate) ,
        name: name,
        age :age,
        parentsAddress:parentsAddress,   
        nameOf_prominent_institutions: nameOf_prominent_institutions,  
        psycoticPast: Boolean(psycoticPast),
        criminalRecord: Boolean(criminalRecord),
        addiction_History: Boolean(addiction_History),
        background: Boolean(background),
        contact: contact,
        personalPhone: personalPhone,
        formFiller: formFiller,
        referrer: referrer,
        prominent_institutions:Boolean(prominent_institutions),
        sleepingPlace: sleepingPlace,
        therapeutic_history: Boolean(therapeutic_history)
      });
    }
    window.location.reload(false);
    navigate('./search');
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

                        {currentUser &&
                          <>
                            <td className="del">
                              {!inhmlsIsPending &&
                                inHmlsLists.find((inhml) => inhml.id === item.id)
                                &&
                                <button className="bi bi-door-open"onClick={() => handleDe(item.id,item.name,item.age,item.parentsAddress,item.nameOf_prominent_institutions,item.psycoticPast
                                ,item.criminalRecord,item.addiction_History,item.background,item.contact,item.personalPhone,item.formFiller,item.referrer,item.sleepingPlace
                                )}></button>}
                            </td>

                            <td className="del">
                              <button className="bi bi-person-x" onClick={() => handleDelete(item.id)}></button>
                            </td>

                            <td>
                              <button className="view bi bi-person-square" onClick={() => {
                                  navigate(`/search/${item.id}`)
                                }}>
                              </button>
                            </td>  

                            <td>{item.nameOf_prominent_institutions}</td>
                          </> 
                        }
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
      
          <div className="ms-auto me-auto d-flex col-md-6">
          {currentUser && <>

            <DropdownButton
              id="dropdown1"
              variant="secondary"
              title="סנן לפי"
              className="dropdown dropleft"
              size="sm"
            >
              <Dropdown.Item  >
              <button className ="btn2"onClick={handleClickPsycotic}>רקע פסיכיאטרי </button >

              </Dropdown.Item>
              <Dropdown.Item >
                <a onClick={handleClickCriminal}>רקע פלילי</a>
              </Dropdown.Item>

              <Dropdown.Item >
                <a onClick={handleClickAddiction}>רקע התמכרותי</a>
              </Dropdown.Item>

              <Dropdown.Item >
                <a onClick={handleClickAll}>כל הצעירים</a>
              </Dropdown.Item>

            </DropdownButton>
          </>}
            <input
              type="text"
              className="form-control"
              placeholder="חפש לפי : שם / כתובת / גיל / ת.ז / מוסדות קודמות"
              onChange={(event) => {
                setSearch(event.target.value)
              }} />
          </div>
          

          <Link to="/add">
            <button className="me-0" style={{ display: 'block' }}>הוספת צעיר</button>
          </Link>
          <ExportCSV  csvData={saveItem} fileName={file} />


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
                    {currentUser &&
                      <>
                        <th style = {{width:'5%'}} className="del">להוציא מהשלטר</th>
                        <th className="del">למחוק</th>
                        <th>צפה בפרופיל</th>
                          <th>מסודות שהיה בהן בעבר</th>
                      </>
                    }
                    <th>עיר מגורים</th>
                    <th>גיל</th>
                    <th>ת.ז</th>
                    <th className="namee">שם</th>

                  </tr>
                </thead>
                <tbody>
       
                  {
                    
                      homeless.filter((item) => {
                      const homelessName = item.name && item.name.includes(search)
                      const homelessAddress = item.parentsAddress && item.parentsAddress.includes(search)
                      const homelessAge = item.age && String(item.age).includes(search)
                      const homelessId = item.id && String(item.ID).includes(search)
                      const homelessPastEstablishment = item.nameOf_prominent_institutions && item.nameOf_prominent_institutions.includes(search)
                     
                  
                      if (checked === "psycotic" && !item.psycoticPast) {
                        return false;
                      }
                      if (checked === "criminal" && !item.criminalRecord) {
                        return false;
                      }
                      if (checked === "addiction" && !item.addiction_History) {
                        return false;
                      }
                      if (homelessName || homelessAddress || homelessAge || homelessId || homelessPastEstablishment) {
                        return item
                      }
                      if (search === "") {
                        return item
                      }
                    }).map(item => tableFil(item)

                      
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