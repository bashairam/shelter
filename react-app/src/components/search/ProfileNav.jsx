import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { NavDropdown, NavItem } from 'react-bootstrap';
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import useFetch from "../useFetch";
import Role from "../Role";
import useAuth from "../../hooks/useAuth";
import AllReport from "../AllReport";
import { async } from "@firebase/util";

function ProfileNav() {
  
    let { profileSlug } = useParams();
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const [loading , setLoading] = useState(false);
  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessReports = doc(firestore, "reports", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
  let docRef = null
  const dataa = []
  const forms = []
  const [homelessId,setHomelessId]=useState(0);
  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');
  const [homeless, setHomeless] = useState([]);



  onSnapshot(homelessinfo, (doc) => {
    setHomeless(doc.data());

    setHomelessId(doc.id);

  })
  useEffect(() => {

    //---------------------------fill the array with documents name ------------
    const listRef1 = ref(storage,`homelessSignedForms/${profileSlug}`)
    listAll(listRef1)
      .then((res1) => {
        res1.items.forEach((itemRef) => {
          forms.push(itemRef.name)
          setFormsData(forms)
        });
      }).catch((error) => {
        alert("בבקשה נסה שוב")
        console.error(error)
      });

    //----------------------------fill the array with signed forms name ---------------
    const listRef = ref(storage, `homelessDocuments/${profileSlug}`)
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          dataa.push(itemRef.name)
          setData(dataa)

        });
      }).catch((error) => {
        alert("בבקשה נסה שוב")
        console.error(error)
      });

  }, [profileSlug]);


  //--------------------------------function to get spacific data--------------------------------------

  onSnapshot(homelessinfo, (doc) => {
    setHomeless(doc.data());

    setHomelessId(doc.id);

  })

  onSnapshot(homelessReports, (doc) => {
    setReports(doc.data());
  })
  onSnapshot(homelessHistory, (doc) => {
    setHistory(doc.data());
  })
 
//-----------------------------functions for display the informations-------------------------------
 

const container = document.getElementById('demo');

const handleClickRe = (e) => { container.innerHTML=<AllReport id={{homelessId}} />};

const handleClickHis = (e) => { container.innerText = history[e.target.id] };

const handleClickDoc = (e) => {
  // setLoading(true);
  console.log(e.target.title);
  const docRef1 = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.title}`)
  getDownloadURL(docRef1).then(function (url) {
    setLoading(false);
    window.open(url)
  })
};

const handleClickSign = (e) => {
  console.log(e.target.id)
  const signedFormRef = ref(storage, `/homelessSignedForms/${profileSlug}/${e.target.id}`)
  getDownloadURL(signedFormRef).then(function (url) {
    window.open(url)
  })
};
const handleDelete = async (id) => {
    window.confirm("? האם אתה בטוח שאתה רוצה למחוק את הצעיר ממערכת");
   const docRe = doc(firestore,"inHomelesses",id)

   await deleteDoc(docRe)

   navigate('./search'); 
   
 }

//-----------------------------functions for delete documents from firebase storage-------------------

const handleClickDel = (e) => { //dalete documents
  setLoading(true);
  const delDocRef = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.id}`)
  deleteObject(delDocRef).then(() => {
    const text =  "' קובץ" +e.target.id+ " נמחק בהצלחה ' "
    alert(text)
    window.location.reload()
  }).catch((error) => {
    alert("בבקשה נסה שוב")
    console.error(error)
  });
}
const handleClickDelForm = (e) => { //delete Signed forms
  setLoading(true);
  const delSignedFormRef = ref(storage, `/homelessSignedForms/${profileSlug}/${e.target.id}`)
  deleteObject(delSignedFormRef).then(() => {
    setLoading(false);
    const text =  "' קובץ" +e.target.id+ " נמחק בהצלחה ' "
    alert(text)
    window.location.reload()
  }).catch((error) => {
    alert("בבקשה נסה שוב")
    console.error(error)
  });
}


  return (

    <div className="navigation-ls">
      <nav className="navbar navbar-expand  ">
        <div className="container-fluid">

          <div className='ml-auto'>
            <ul className="navbar-nav">
              <li className="nav-item1">
                
                <NavDropdown title="טפסים חתומים" id="collasible-nav-dropdown1" style ={{right : '50%'}}>
                 
                  {
                    ((formsData.length === 0) && ( <NavDropdown.Item className="text-end">
                   
                     <a> אין טפסים חתומים </a>
                
                    </NavDropdown.Item>) ) ||(formsData && formsData.map((val,index) => (
                      <NavDropdown.Item key = {index} className="text-end">
                          <button id={val}  style={{ width : '20%' }}  className = "deleteBtn" onClick={handleClickDelForm}> מחק</button>
                         <button id={val.id} title = {val} onClick={handleClickSign} className = "btn2" >{val}</button>
                      </NavDropdown.Item>
                    )))
                    
                  }
                </NavDropdown>
              </li>

              <li>
              <NavLink className="nav-link" to="/allreports"  state={{id:profileSlug}}>
                  דוחות
                </NavLink>
              </li>
              {
                Role({currentUser},{users},{isPending},['מנהל','רכז','עובד סוציאלי'])==true
                 
                &&
                <li className="nav-item1">
                <NavDropdown title="מסמכים" id="collasible-nav-dropdown1" style ={{right : '30%'}}>
                  {
                      ((data.length === 0) && ( <NavDropdown.Item className="text-end" >
                   
                      <a > אין מסמכים </a>
                 
                       </NavDropdown.Item>) ) ||(
                       data && data.map((val,index) => (
                      <NavDropdown.Item  key = {index} className="text-end">
                        <button id={val} style={{ width : '20%' }} onClick={handleClickDel} className = "deleteBtn"> מחק</button>
                        <button id={val.id} title = {val} onClick={handleClickDoc} className = "btn2">{val}</button>
                      </NavDropdown.Item>
                    ))
                    )   
                  }
                </NavDropdown>
              </li>
              }



           
              {Role({currentUser},{users},{isPending},['מנהל','רכז','עובד סוציאלי'])==true                     
                &&
                <li className="nav-item1">


                <NavDropdown title="רקע" id="collasible-nav-dropdown1" style ={{left : '50%'}}>

                  {

                    !homeless.background &&

                    <NavDropdown.Item className="text-end">

                      <button id='background' className ="btn2"  onClick={handleClickHis}>רקע כללי</button>

                    </NavDropdown.Item>
                  }
                  {

                    !homeless.therapeutic_history &&

                    <NavDropdown.Item className="text-end">

                      <button id='therapeutic_history' className ="btn2" style={{ float: 'right' }}onClick={handleClickHis}>רקע טיפולי</button>

                    </NavDropdown.Item>
                  }{
                    !homeless.addiction_History &&

                    <NavDropdown.Item className="text-end">

                      <button id='addiction_History' className ="btn2" style={{ float: 'right' }} onClick={handleClickHis}>רקע התמכרותי</button>

                    </NavDropdown.Item>

                  }{
                    !homeless.criminalRecord &&

                    <NavDropdown.Item className="text-end">

                      <button id='criminalRecord' className ="btn2" style={{ float: 'right' }}onClick={handleClickHis}>רקע פלילי</button>

                    </NavDropdown.Item>

                  }{
                    !homeless.psycoticPast &&

                    <NavDropdown.Item className="text-end">

                      <button id='psycoticPast' className ="btn2"style={{ float: 'right' }} onClick={handleClickHis}>רקע פסיכיאטרי</button>

                    </NavDropdown.Item>
                  }{
                    !homeless.prominent_institutions &&

                    <NavDropdown.Item className="text-end">

                      <button id='prominent_institutions' className ="btn2" style={{ float: 'right' }} onClick={handleClickHis}>מוסדות</button>

                    </NavDropdown.Item>



                  }
                </NavDropdown>
              </li>
            }
              

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default  ProfileNav;