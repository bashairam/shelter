import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { ref, uploadBytes, listAll } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import LoadingScreen from 'react-loading-screen';
import ProfileNav from "./ProfileNav";

export function Profile() {

  //-------------------------variables-----------------------------------------------
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const [loading , setLoading] = useState(false);
  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessReports = doc(firestore, "reports", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
 const [homelessId,setHomelessId]=useState(0);
  let docRef = null
  const dataa = []
  const forms = []


   
 //------------------------------------------------------------------------------------------------- 
 
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
 

 //------------------------------functions to upload the documents to firebase storage----------------------------------------

 const handleClickUpload = (e) => {
  e.preventDefault()
  setLoading(true);
  const identifier = e.target.title
  const file = e.target.files[0]
  console.log(e.target.title)
  if (!file){
    setLoading(false);
    alert("נא לבחור קובץ קודם")
    return
  } 
  if(!identifier){
    setLoading(false);
    alert("תנסה שוב בבקשה")
    return
  }
  uploudDocument(file, identifier)
}
const uploudDocument = (file, identifier) => {

  if (identifier === 'doc') {
    docRef = ref(storage, `/homelessDocuments/${profileSlug}/${file.name}`) //choose a differents name for the docs
  }
  else {
    docRef = ref(storage, `/homelessSignedForms/${profileSlug}/${file.name}`) //choose a differents name for the docs
  }
  uploadBytes(docRef, file).then(() => {
    setLoading(false);
    const text =  "' קובץ" +e.target.id+ " נשמר בהצלחה ' "
    alert(text)
    window.location.reload()
  })

}

 


  //------------------------------------------------Display all the page------------------------------------------

  return (
 
    <div className="home">
         {
        loading && <LoadingScreen loading={true}
        bgColor='#f1f1f1'
        spinnerColor='rgb(247, 116, 9)'
        textColor='#rgba(0, 0, 0, 0.877)'
        text='...טוען'> </LoadingScreen>
      
      }
     <div className="clicks">

      <div className="vl">

        <div className="info">

            {/* name */}
            <div className="subInfo" data-toggle="tooltip" data-placement="bottom" title="שם הצעיר">
               {homeless.name}
             </div>

          <div className="infoDetails">

            {/* age */}
            {homeless.age && <div>{homeless.age}<i className="bi1 bi-person fa-fw" data-toggle="tooltip" data-placement="bottom" title="גיל"></i></div>}
           
            {/* address */}
            {homeless.parentsAddress && <div>{homeless.parentsAddress}<i className="bi2 bi-house-door fa-fw" data-toggle="tooltip" data-placement="bottom" title="כתובת"></i></div>}
           
            {/* phone */}
            {homeless.personalPhone && <div>{homeless.personalPhone}<i className="bi3 bi-telephone fa-fw" data-toggle="tooltip" data-placement="bottom" title="טלפון"></i></div>}
           
            {/* mentor */}
            {homeless.formFiller && <div>{homeless.formFiller}<i className="bi4 bi-journal-check fa-fw" data-toggle="tooltip" data-placement="bottom" title ="עובד סוציאלי"></i></div>}

          </div>
         
        </div>
        <div className = "cli">
        <Link to={"/updateDetailsHomeless"} state={{id:homelessId}}>
          <button className="me-0 "  style={{right: "53%"}} > עדכון פרטים<i className ="bi5 bi-pencil fa-fw"></i> </button>
        </Link>
     
        <Link to={"/report"} state={{id:homelessId, method:"create"}}>
          <button className="me-0 " > הוספת דוח<i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>
        </Link>
        
        </div>
        <div>

        </div>
        <div className="cli1" >
          <label htmlFor="formFile" className="btn"   data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת מסמכים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
             <input type="file" id="formFile" title = "doc" style={{buttom : '50%'}} onChange={handleClickUpload}/>
        </div>
    
        <div className="cli2">
        <label htmlFor="formFile" className="btn" style={{buttom : '2%'}}  data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
             <input type="file" id="formFile" title = "sign" onChange={handleClickUpload}/>
       
        </div>

        

      </div>
            </div>
            <div className="ff"> 
            {/* <ColoredLine color="rgb(247, 116, 9)" /> */}
            <hr className="new4" />
            </div>
      <div className="tab_4 ">
       
        <ProfileNav />

        <div  id="demo">
        {history.background}

        </div>

      </div>

    </div> 



  );
}

export default Profile;