import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { NavDropdown } from 'react-bootstrap';
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import LoadingScreen from 'react-loading-screen';

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
  const homelessReports = doc(firestore, "Reports", profileSlug)
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
 
  //-----------------------------functions for display the informations-------------------------------
 

  const container = document.getElementById('demo');

  const handleClickRe = (e) => { };

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
Z
        <div className="info">

            {/* name */}
            <div className="subInfo" data-toggle="tooltip" data-placement="bottom" title="שם הצעיר">
               {homeless.name}
             </div>

          <div className="infoDetails">

            {/* age */}
            {homeless.age && <tr>  {homeless.age}  <i className="bi1 bi-person fa-fw" data-toggle="tooltip" data-placement="bottom" title="גיל"></i></tr>}
           
            {/* address */}
            {homeless.parentsAddress && <tr> {homeless.parentsAddress}  <i className="bi2 bi-house-door fa-fw" data-toggle="tooltip" data-placement="bottom" title="כתובת"></i>  </tr>}
           
            {/* phone */}
            {homeless.personalPhone && <tr>{homeless.personalPhone} <i className="bi3 bi-telephone fa-fw" data-toggle="tooltip" data-placement="bottom" title="טלפון"></i></tr>}
           
            {/* mentor */}
            {homeless.formFiller && <tr>{homeless.formFiller} <i className="bi4 bi-journal-check fa-fw" data-toggle="tooltip" data-placement="bottom" title ="עובד סוציאלי"></i></tr>}

            {/* status */}
            {/* {homeless.date && <tr>{homeless.formFiller} <i className="bi4 bi-journal-check fa-fw" data-toggle="tooltip" data-placement="bottom" title ="עובד סוציאלי"></i></tr>} */}
          </div>
         
        </div>
        <div className = "cli">
        <Link to={"/updateDetailsHomeless"} state={{id:homelessId}}>
          <button className="me-0 "  style={{right: "53%"}} > עדכון פרטים<i className ="bi5 bi-pencil fa-fw"></i> </button>
        </Link>
     
        <Link to={"/report"} state={{id:homelessId, method:"create"}}>
          <button className="me-0 " > הוספת דוח<i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>
        </Link>
       
        <Link to={"/allreports"} state={{id:homelessId}}>
          <button className="me-0 " >  כל הדוחות<i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>

        </Link>
        
        
        </div>
       
        

        <div className="cli1"  >
          <label for="formFile" className="btn"   data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת מסמכים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
             <input type="file" id="formFile" title = "doc" style={{buttom : '50%'}} onChange={handleClickUpload}/>
        </div>
    
        <div className="cli2">
        <label for="formFile" className="btn" style={{buttom : '2%'}}  data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
             <input type="file" id="formFile" title = "sign" onChange={handleClickUpload}/>
       
        </div>
       
           
       
       
      
        

</div>
      </div>
      <div className="ff"> 
      {/* <ColoredLine color="rgb(247, 116, 9)" /> */}
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


                  {/* <li className="nav-item1">
                    <NavDropdown title=" דוחות" id="collasible-nav-dropdown1" style ={{left : '10%'}}>
                       
                      {reports && Object.keys(reports).map((re, i) => (

                        <NavDropdown.Item className="text-end">
                          <button id={"re" + (i + 1)} onClick={handleClickRe}> דוח {i + 1} </button>
                        </NavDropdown.Item>
                      ))
                      }

                    </NavDropdown>

                  </li> */}

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