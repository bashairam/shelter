import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { collection, getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { NavDropdown } from 'react-bootstrap';
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import { v4 } from "uuid"
import 'firebase/storage';


export function Profile() {

  //-------------------------variables-----------------------------------------------
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  let docRef = null
  const dataa = []
  const forms = []

  const [homelessId, sethomelessId] = useState([]);
 
  useEffect(() => {
    const current = profileSlug;
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

  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessReports = doc(firestore, "Reports", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
  const homelessDoc = doc(firestore, "documents", profileSlug)
  const homelessSignedForms = doc(firestore, "signedForms", profileSlug)

  //--------------------------------function to get spacific data--------------------------------------

  onSnapshot(homelessinfo, (doc) => {
    setHomeless(doc.data());
   
    sethomelessId(doc.id);
  })

  onSnapshot(homelessReports, (doc) => {
    setReports(doc.data());
  })
  onSnapshot(homelessHistory, (doc) => {
    setHistory(doc.data());
  })
 
  //-----------------------------

  const container = document.getElementById('demo');

  const handleClickRe = (e) => {   };

  const handleClickHis = (e) => { container.innerText = history[e.target.id]  };

  const handleClickDoc = (e) => {
    const docRef1 = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.id}`)
    getDownloadURL(docRef1).then(function (url) {
      window.open(url)
    })
  };
  const handleClickDel = (e) => {
    const delDocRef = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.id}`)
    deleteObject(delDocRef).then(() => {
      alert("הקובץ נמחק בהצלחה")
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    });
  }
  const handleClickDelForm = (e) => {
    const delSignedFormRef = ref(storage, `/homelessSignedForms/${profileSlug}/${e.target.id}`)
    deleteObject(delSignedFormRef).then(() => {
      alert("הקובץ נמחק בהצלחה")
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    });
  }
  const handleClickSign = (e) => {
    console.log(e.target.id)
    const signedFormRef = ref(storage, `/homelessSignedForms/${profileSlug}/${e.target.id}`)
    getDownloadURL(signedFormRef).then(function (url) {
      window.open(url)
    })

  };

  const handleClickUpload = (e) => {
    e.preventDefault()
    const identifier = e.target.id
    const file = e.target[0].files[0]
    uploudDocument(file, identifier)
  }
  const uploudDocument = (file, identifier) => {
    if (!file) return

    if (identifier === 'doc') {
      docRef = ref(storage, `/homelessDocuments/${profileSlug}/${file.name}`) //choose a differents name for the docs
    }
    else {
      docRef = ref(storage, `/homelessSignedForms/${profileSlug}/${file.name}`) //choose a differents name for the docs
    }
    uploadBytes(docRef, file).then(() => {
      alert("הקובץ נשמר בהצלחה")
    })

  }


  return (
    <div className="home">
      <div className="clicks">
        <div className="info">
          {/* name */}
          <div className="subInfo">
            {homeless.name}
          </div>
          <div className="infoDetails">
            <tr>  {homeless.age}</tr>
            {/* address */}
            <tr>  {homeless.parentsAssress}</tr>
            {/* phone */}
            <tr>{homeless.personalPhone}</tr>
            {/* mentor */}
            <tr>{homeless.formFillerId}</tr>
          </div>
        </div>
        <Link to={"/report"}  state={{id:homelessId}} >
          <button className="me-0" style={{ display: 'block' }}>הוספת דו״ח</button>
        </Link>
        <Link to={"/updateDetailsHomeless"} state={{id:homelessId}}    >
          <button className="me-0" style={{ display: 'block' }}>עדכון פרטי הצעיר </button>
        </Link>
        <Link to={"/allreports"}   state={{id:homelessId}} >
          <button className="me-0" style={{ display: 'block' }}>הצג כל הדוחות </button>
        </Link>
        


        <form id="doc" onSubmit={handleClickUpload}>
          <input type="file" ></input>
          <button type="submit" id="subDoc"> העלאת מסמכים</button>
        </form>
        <form id="sign" onSubmit={handleClickUpload}>
          <input type="file" ></input>
          <button type="submit" id="subSign" > העלאת טפסים חתומים </button>
        </form>

      </div>


      <div className="tab_4 ">

        <div className="navigation">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
              <div className='ml-auto'>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavDropdown title="טפסים חתומים" id="collasible-nav-dropdown">
                      {
                        formsData && formsData.map((val) => (
                          <NavDropdown.Item className="text-end">
                            <button id={val.id} style={{ float: 'right' }} onClick={handleClickSign} >{val}</button>
                            <button id={val} style={{ float: 'left' }} onClick={handleClickDelForm}> מחק</button>
                          </NavDropdown.Item>
                        ))
                      }
                    </NavDropdown>
                  </li>
                  <li className="nav-item">
                    <NavDropdown title="מסמכים" id="collasible-nav-dropdown">

                      {
                        data && data.map((val) => (
                          <NavDropdown.Item className="text-end">
                            <button id={val.id} style={{ float: 'right' }} onClick={handleClickDoc} >{val}</button>
                            <button id={val} style={{ float: 'left' }} onClick={handleClickDel}> מחק</button>
                          </NavDropdown.Item>
                        ))
                      }
                    </NavDropdown>
                  </li>


                  <li className="nav-item">
                    <NavDropdown title=" דוחות" id="collasible-nav-dropdown">

                      {reports && Object.keys(reports).map((re, i) => (
                        
                        <NavDropdown.Item className="text-end">
                          <button id={"re" + (i + 1)} onClick={handleClickRe}> דוח {i + 1} </button>
                        </NavDropdown.Item>
                      ))
                      }

                    </NavDropdown>

                  </li>

                  <li className="nav-item">


                    <NavDropdown title="רקעים" id="collasible-nav-dropdown">

                      {

                        !homeless.background &&

                        <NavDropdown.Item className="text-end">

                          <button id='background' onClick={handleClickHis}>רקע כללי</button>

                        </NavDropdown.Item>
                      }
                      {

                        !homeless.therapeutic_history &&

                        <NavDropdown.Item className="text-end">

                          <button id='therapeutic_history' onClick={handleClickHis}>רקע טיפולי</button>

                        </NavDropdown.Item>
                      }{
                        !homeless.addiction_History &&

                        <NavDropdown.Item className="text-end">

                          <button id='addiction_History' onClick={handleClickHis}>רקע התמכרותי</button>

                        </NavDropdown.Item>

                      }{
                        !homeless.criminalRecord &&

                        <NavDropdown.Item className="text-end">

                          <button id='criminalRecord' onClick={handleClickHis}>רקע פלילי</button>

                        </NavDropdown.Item>

                      }{
                        !homeless.psycoticPast &&

                        <NavDropdown.Item className="text-end">

                          <button id='psycoticPast' onClick={handleClickHis}>רקע פסיכיאטרי</button>

                        </NavDropdown.Item>
                      }{
                        !homeless.prominent_institutions &&

                        <NavDropdown.Item className="text-end">

                          <button id='prominent_institutions' onClick={handleClickHis}>מסדות</button>

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



      </div>
      <div id="demo">
        {history.background}
      </div>
    </div>



  );
}

export default Profile;