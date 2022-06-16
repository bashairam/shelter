import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { NavDropdown ,Tab } from 'react-bootstrap';
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import ReactDOM from 'react-dom/client';
import LoadingScreen from 'react-loading-screen';
import * as FileSaver from "file-saver";
import {v4} from "uuid"

export function Profile() {

  //-------------------------variables-----------------------------------------------
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [inHomeless, setInHomeless] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const [loading , setLoading] = useState(false);
  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
  const InHomelessInfo = doc(firestore, "inHomelesses", profileSlug)
 
  let docRef = null
  const dataa = []
  const forms = []
  let enterDate = ""
  let enterTime=""
  let exitDate = ""
  let exitTime=""

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
  })

  onSnapshot(InHomelessInfo, (doc) => {
    setInHomeless(doc.data());
  })
  onSnapshot(homelessHistory, (doc) => {
    setHistory(doc.data());
  })
 
  //-----------------------------functions for display the informations-------------------------------
 

  const container = document.getElementById('demo');
  
  const handleClickGen = (e) => {  //-------Split the date and the time-----------------
    if(homeless.date){ //enter date 
      const enter1 = homeless.date;
      let enter = enter1.split('T');
      enterDate = enter[0];
      enterTime = enter[1];
    }

    if(homeless.exitDate){//exit date
      const enter2 =homeless.exitDate;
      let enter21 = enter2.split('T');
      exitDate = enter21[0];
      exitTime = enter21[1]; 
    }
    
   const myElement = (

  <div className="infoDeta text-right"  > 

  {/*Enter Date*/}
 
  {homeless.date && <tr key = {homeless.id+v4()}> תאריך כניסה :  {enterDate}   </tr>}

  {/*Enter Time*/}
  {homeless.date && <tr key = {homeless.id+v4()}> זמן כניסה :  {enterTime}    </tr>}

  {/* Room */}
  { (!homeless.exitDate && inHomeless.room && <tr key = {homeless.id+v4()}> מספר חדר בשלטר :  {inHomeless.room} </tr>)}
   
  {/* Stage */}
  {(!homeless.exitDate && inHomeless.stage && <tr key = {homeless.id+v4()}> שלב בשלטר :  {inHomeless.stage} </tr>) }
 
  {/*referrer*/}
  {homeless.referrer && <tr key = {homeless.id+v4()}>גורם פנייה : {homeless.referrer}  </tr>}
  
  {/* mentor */}
  {homeless.exitDate&& homeless.formFiller && <tr key = {homeless.id+v4()}>עובד סוציאלי הקודם :  {homeless.formFiller} </tr>}

  {/*Contact */}
  {homeless.contact && <tr key = {homeless.id+v4()}>טלפון איש קשר :  {homeless.contact}</tr>}
 
  {/*Sleeping place */}
  {homeless.sleepingPlace && <tr key = {homeless.id+v4()}>מקום שינה אחרון :  {homeless.sleepingPlace} </tr>}

  {/*name Of prominent institutions*/}
  {homeless.nameOf_prominent_institutions && <tr key = {homeless.id+v4()} style={{ color: 'rgb(247, 116, 9)' , fontWeight :'600'}}> המסדות שהיה בהן בעבר :  {homeless.nameOf_prominent_institutions}</tr>  }
  
  {/*Exit Date*/}
  {homeless.exitDate && <tr key = {homeless.id+v4()}> תאריך יצאה :  {exitDate}   </tr>}

   {/*Enter Time*/}
  {homeless.exitDate && <tr key = {homeless.id+v4()}> זמן יצאה :  {exitTime}   </tr>}

</div>
  )
  let root = ReactDOM.createRoot(document.getElementById('demo'));
  root.render(myElement);
}

  
  
  const handleClickHis = (e) => { container.innerText = history[e.target.id]  };

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

  //-----------------------------functions for delete documents from firebase storage-------------------

  const handleClickDel = (e) => { //dalete documents
    setLoading(true);
    const delDocRef = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.id}`)
    deleteObject(delDocRef).then(() => {
      const text =  "  קובץ  '  "  + e.target.id + "  ' נמחק בהצלחה "
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
      const text =  "  קובץ  '  "  + e.target.id + "  ' נמחק בהצלחה "
      alert(text)
      window.location.reload()
    }).catch((error) => {
      alert("בבקשה נסה שוב")
      console.error(error)
    });
  }
  
 //------------------------------functions to upload the documents to firebase storage----------------------------------------

 

const handleClickUploadSigned = (e) => {
 

  const file = e.target.files[0];
  if (!file){
    setLoading(false);
    alert("נא לבחור קובץ קודם")
    return
  } 
  docRef = ref(storage, `/homelessSignedForms/${profileSlug}/${file.name}`) //choose a differents name for the docs
  uploadBytes(docRef, file).then(() => {
    setLoading(false);
    const text =  "  קובץ  '  "  + file.name + "  ' נשמר בהצלחה "
    alert(text)
    window.location.reload()
      
  })
}
const handleClickUploadDoc = (e) => {
  console.log(e.target.title)
   if(e.target.title === "sign"){
    console.log("turn")
    handleClickUploadSigned()
   }
  setLoading(true);
  const file = e.target.files[0];
  if (!file){
    setLoading(false);
    alert("נא לבחור קובץ קודם")
    return
  } 
  docRef = ref(storage, `/homelessDocuments/${profileSlug}/${file.name}`) //choose a differents name for the docs
  uploadBytes(docRef, file).then(() => {
    setLoading(false);
    const text =  "  קובץ  '  "  + file.name + "  ' נשמר בהצלחה "
    alert(text)
    window.location.reload()
      
  })
}

 
  //------------------------------------------------Display all the page------------------------------------------

  return (

   
 
    <div className="home">
      <script src="https://kit.fontawesome.com/yourcode.js" crossOrigin="anonymous"></script>
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
        <span className="dot" style={{marginBottom: '40px'}}></span>
            {/* name */}
            
             <div className="subInfo" data-toggle="tooltip" data-placement="bottom" title="שם הצעיר">
                 
              <button className="btn5" data-toggle="tooltip" data-placement="bottom" title="עדכון פרטים"><i className="fa-1 bi-pencil-fill fa-fw"></i></button>
               {homeless.name}
             
             </div>
           
            <div className="infoDetails">
            
            {/* id */}
            {profileSlug && <tr key = {homeless.id+v4()}>  {profileSlug}  <i className="bi1 bi-card-text fa-fw" data-toggle="tooltip" data-placement="bottom" title="תעודת זהות"></i></tr>}  
           
            {/* age */}
            {homeless.age && <tr key = {homeless.id+v4()}>  {homeless.age}  <i className="bi1 bi-person fa-fw" data-toggle="tooltip" data-placement="bottom" title="גיל"></i></tr>}
           
            {/* address */}
            {homeless.parentsAddress && <tr key = {homeless.id+v4()}> {homeless.parentsAddress}  <i className="bi2 bi-house-door fa-fw" data-toggle="tooltip" data-placement="bottom" title="כתובת"></i>  </tr>}
           
            {/* phone */}
            {homeless.personalPhone && <tr key = {homeless.id+v4()}>{homeless.personalPhone} <i className="bi3 bi-telephone fa-fw" data-toggle="tooltip" data-placement="bottom" title="טלפון"></i></tr>}
           
            {/* mentor */}
            {!homeless.exitDate && homeless.formFiller && <tr key = {homeless.id+v4()}>{homeless.formFiller} <i className="bi4 bi-journal-text" data-toggle="tooltip" data-placement="bottom" title ="עובד סוציאלי"></i></tr>}

            {/* status */}
            { (homeless.exitDate &&<tr key = {homeless.id+v4()}> יצא משלטר<i className="bi4 bi-door-open" data-toggle="tooltip" data-placement="bottom" title ="סטטוס"></i></tr>)
               || (homeless.date && <tr key = {homeless.id+v4()}>נמצא בשלטר<i className="bi4 bi-person-check" data-toggle="tooltip" data-placement="bottom" title ="סטטוס"></i></tr>) 
            }
          
          </div>
          
        </div>
        
        <div className = "cli">
        <span className="dot1" ></span>
        <Link to="/report">
          <button className="me-1 "  > הוספת דוח  <i className="bi5 bi-file-earmark-plus fa-fw" key = "2"></i> </button>
       
        </Link>
     
        <Link to="/report">
          <button className="me-0 " >כל הדוחות <i className="bi5 bi-folder" key = "1"></i></button>
        </Link>
        
        </div>
        
      
        <div className="cli1" >
        
          <label htmlFor="formFile" className="btn"  data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת מסמכים <i className="bi6 bi-cloud-upload fa-lg" style={{left : '10%'}}></i></label>
             <input type="file" id="formFile"  onChange={handleClickUploadDoc}/>
        </div>

       
        
        {homeless.exitDate && <div className="cli2"> 
      
        <label htmlFor="formFile" className="btn"  data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
             <input type="file" id="formFile" title = "sign" onChange={handleClickUploadSigned}/>
        </div>
        }

       {!homeless.exitDate && <div className="cli2" style={{paddingBottom : '35px'}}> 
      
         <label htmlFor="formFile" className="btn"  data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
           <input type="file" id="formFile" title = "sign" onChange={handleClickUploadSigned}/>
          </div>
      }
        
        
       
      
        


      </div>
    
     
      <hr className="new4" />
      
      </div>
      <div className="tab_4 ">

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
                    
                        </NavDropdown.Item>) ) ||(formsData && formsData.map((val) => (
                          <NavDropdown.Item className="text-end">
                              <button id={val}  style={{ width : '20%' }}  className = "deleteBtn" onClick={handleClickDelForm}> מחק</button>
                             <button id={val.id} title = {val} onClick={handleClickSign} className = "btn2" >{val}</button>
                          </NavDropdown.Item>
                        )))
                        
                      }
                    </NavDropdown>
                  </li>
                  <li className="nav-item1">
                    <NavDropdown title="מסמכים" id="collasible-nav-dropdown1" style ={{right : '30%'}}>
                      {
                          ((data.length === 0) && ( <NavDropdown.Item className="text-end" >
                       
                          <a > אין מסמכים </a>
                     
                           </NavDropdown.Item>) ) ||(
                           data && data.map((val) => (
                          <NavDropdown.Item className="text-end">
                            <button id={val} style={{ width : '20%' }} onClick={handleClickDel} className = "deleteBtn"> מחק</button>
                            <button id={val.id} title = {val} onClick={handleClickDoc} className = "btn2">{val}</button>
                          </NavDropdown.Item>
                        ))
                        )   
                      }
                    </NavDropdown>
                  </li>


                  <li className="nav-item1">


                    <NavDropdown title="רקעים" id="collasible-nav-dropdown1" style ={{left : '50%'}}>

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

                          <button id='prominent_institutions' className ="btn2" style={{ float: 'right' }} onClick={handleClickHis}>מסדות</button>

                        </NavDropdown.Item>

                      }
                    </NavDropdown>
                  </li>

                  
                  <li className="nav-item1">
                    <NavDropdown title="מידע כללי" id="collasible-nav-dropdown1" style ={{left : '70%'}} onClick={handleClickGen}>
                    
                    </NavDropdown>

                  </li>

                     
                 

  
                </ul>
              </div>
              <div className='ms-auto'>
  

              </div>

            </div>
          </nav>
        </div>
        <div id="demo">
        {history.background}
      
      </div>
      </div>

      
    </div> 



  );
}

export default Profile;