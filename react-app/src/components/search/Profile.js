import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { collection, getDocs, getDoc, onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { Dropdown, FormSelect } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import { v4 } from "uuid"
import 'firebase/storage';
import useForceUpdate from 'use-force-update';

export function Profile() {

  //-------------------------variables-----------------------------------------------
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [files, setFiles] = useState([]);
  const [homelessDocuments, setHomelessDocuments] = useState([]);
  const [signedForms, setSignedForms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const col = collection(firestore, "homelesses");
  let docRef = null
  const val = []
  const dataa = []
  const forms =[]
  const his1 = {
    background: 'רקע כללי',
    therapeutic_history: 'רקע טיפולי',
    addiction_History: 'רקע התמכרותי',
    criminalRecord: 'רקע פלילי',
    psycoticPast: 'רקע פסיכיאטרי',
    prominent_institutions: 'מסדות'
  }
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const current = profileSlug;
       
    const listRef1 = ref(storage, 'homelessSignedForms/')
      listAll(listRef1)
      .then((res1) => {
        res1.items.forEach((itemRef) => {
          forms.push(itemRef.name)
          console.log(forms)
          setFormsData(forms)
          console.log("ll" , formsData)
        });
      }).catch((error) => {
        alert("בבקשה נסה שוב")
        console.error(error)
      });

    const listRef = ref(storage, 'homelessDocuments/')
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
    setFiles(Object.keys(homeless).filter(key => homeless[key] === "on"))
    setFiltered(Object.keys(his1).filter((i) => files.includes(i)))
     forceUpdate();
  })
  onSnapshot(homelessReports, (doc) => {
    setReports(doc.data());
  })
  onSnapshot(homelessHistory, (doc) => {
    setHistory(doc.data());
  })
  onSnapshot(homelessDoc, (doc) => {
    setHomelessDocuments(doc.data());
  })
  onSnapshot(homelessSignedForms, (doc) => {
    setSignedForms(doc.data());
  })

  //-----------------------------

  //--------------------------------------------------------------------------
  const fileInput = useRef();
  const selectFile = () => {
    fileInput.current.click();
  }

  const compare = () => {
    //funtion that filter all the histories that the homeless had 
    
    Object.entries(his1).map(([key, value]) => {
      if (filtered.includes(key)) {
        val.push(value)
        forceUpdate();
      }
    })
  }

  // console.log(filtered)

  const container = document.getElementById('demo');

  const handleClickRe = (e) => { container.innerText = compare() };

  const handleClickHis = (e) => { forceUpdate(); container.innerText = compare() };

  const handleClickDoc = (e) => {
    const docRef1 = ref(storage, `/homelessDocuments/${e.target.id}`)
    getDownloadURL(docRef1).then(function (url) {
      console.log("rkl ", url)
      window.open(url)
    })
  };
  const handleClickDel = (e) => {
    const delDocRef = ref(storage, `/homelessDocuments/${e.target.id}`)
    deleteObject(delDocRef).then(() => {
      alert("הקובץ נמחק בהצלחה")
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    });
  }
  const handleClickDelForm = (e) => {
    const delSignedFormRef = ref(storage, `/homelessSignedForms/${e.target.id}`)
    deleteObject(delSignedFormRef).then(() => {
      alert("הקובץ נמחק בהצלחה")
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    });
  }
  const handleClickSign = (e) => {
    console.log(e.target.id)
    const signedFormRef = ref(storage, `/homelessSignedForms/${e.target.id}`)
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
      docRef = ref(storage, `/homelessDocuments/${file.name}`) //choose a differents name for the docs
    }
    else {
      docRef = ref(storage, `/homelessSignedForms/${file.name}`) //choose a differents name for the docs
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
            {/* age */}
            <tr>  {homeless.age}</tr>
            {/* address */}
            <tr>  {homeless.parentsAssress}</tr>
            {/* phone */}
            <tr>{homeless.personalPhone}</tr>
            {/* mentor */}
            <tr>{homeless.formFillerId}</tr>
          </div>
        </div>
        <Link to="/report">
          <button className="me-0" style={{ display: 'block' }}>הוספת דו״ח</button>
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
                        formsData.map((val) => (
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
                        data.map((val) => (
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

                      {Object.keys(reports).map((re, i) => (
                        <NavDropdown.Item className="text-end">
                          <button id={"re" + (i + 1)} onClick={handleClickRe}> דוח {i + 1} </button>
                        </NavDropdown.Item>
                      ))
                      }

                    </NavDropdown>

                  </li>

                  <li className="nav-item">
                   
                    
                    <NavDropdown title="רקעים" id="collasible-nav-dropdown">
                    {/* {console.log(filtered)} */}
                    
                      {
                        filtered.length && val.length && filtered.map(i => (
                          <NavDropdown.Item className="text-end">
                            <button id={filtered[i]} onClick={handleClickHis}>L (i+1)</button>
                          </NavDropdown.Item>
                        ))

                      }



                      {/* <NavDropdown.Item className="text-end">
                        <button onClick={handleClickHis}> דוח 1 </button>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="text-end">
                        <button onClick={handleClickHis}> דוח 1 </button>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="text-end">
                        <button onClick={handleClickHis}> דוח 1 </button>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="text-end">
                        <button onClick={handleClickHis}> דוח 1 </button>
                      </NavDropdown.Item>

                      <NavDropdown.Item className="text-end">
                        <button onClick={handleClickHis}> דוח 1 </button>
                      </NavDropdown.Item>
                      */}
                    </NavDropdown>
                  </li>

                </ul>
              </div>
              <div className='ms-auto'>


              </div>

            </div>
          </nav>
        </div>






        {/* </div>  */}

      </div>
      <div id="demo">
        {history.background}
      </div>
    </div>



  );
}

export default Profile;