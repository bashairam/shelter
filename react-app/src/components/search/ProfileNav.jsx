import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { firestore, storage } from "../../firebase"
import { onSnapshot, doc } from "firebase/firestore";
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
import * as ReactDOMClient from 'react-dom/client';
import AllReport from "../AllReport";


function ProfileNav() {

  let { profileSlug } = useParams();
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const [inHomeless, setInHomeless] = useState([]);
  const [loading, setLoading] = useState(false);
  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessReports = doc(firestore, "reports", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
  let docRef = null
  const dataa = []
  const forms = []
  const [homelessId, setHomelessId] = useState(0);
  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');
  const [homeless, setHomeless] = useState([]);
  let enterDate = ""
  let enterTime = ""
  let exitDate = ""
  let exitTime = ""


  onSnapshot(homelessinfo, (doc) => {
    setHomeless(doc.data());

    setHomelessId(doc.id);

  })
  useEffect(() => {

    //---------------------------fill the array with documents name ------------
    const listRef1 = ref(storage, `homelessSignedForms/${profileSlug}`)
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
    const docRe = doc(firestore, "inHomelesses", id)

    await deleteDoc(docRe)

    navigate('./search');

  }

  const handleClickGen = (e) => {  //-------Split the date and the time-----------------
    if (homeless.date) { //enter date 
      const enter1 = homeless.date;
      let enter = enter1.split('T');
      enterDate = enter[0];
      enterTime = enter[1];
    }

    if (homeless.exitDate) {//exit date
      const enter2 = homeless.exitDate;
      let enter21 = enter2.split('T');
      exitDate = enter21[0];
      exitTime = enter21[1];
    }

    const myElement = (

      <div className="infoDeta " style={{marginLeft:'auto',marginRight:'auto'}}  >

        {/*Enter Date*/}

        {homeless.date && <tr > תאריך כניסה :  {enterDate}   </tr>}

        {/*Enter Time*/}
        {homeless.date && <tr  > זמן כניסה :  {enterTime}    </tr>}

        {/* Room */}
        {(!homeless.exitDate && inHomeless.room && <tr> מספר חדר בשלטר :  {inHomeless.room} </tr>)}

        {/* Stage */}
        {(!homeless.exitDate && inHomeless.stage && <tr>שלב בשלטר :  {inHomeless.stage} </tr>)}

        {/*referrer*/}
        {homeless.referrer && <tr>גורם מפנה : {homeless.referrer}  </tr>}

        {/*Contact */}
        {homeless.contact && <tr>טלפון איש קשר :  {homeless.contact}</tr>}

        {/*Sleeping place */}
        {homeless.sleepingPlace && <tr>מקום שינה אחרון :  {homeless.sleepingPlace} </tr>}

        {/*name Of prominent institutions*/}
        {homeless.nameOf_prominent_institutions && <tr style={{ color: 'rgb(247, 116, 9)', fontWeight: '600' }}> מוסדות בולטות בעבר : {homeless.nameOf_prominent_institutions}</tr>}

        {/*Exit Date*/}
        {homeless.exitDate && <tr> תאריך יצאה :  {exitDate}   </tr>}

        {/*Enter Time*/}
        {homeless.exitDate && <tr> זמן יצאה :  {exitTime}   </tr>}

      </div>
    )
    let root =ReactDOMClient.createRoot(document.getElementById('demo'));
    root.render(myElement);

  }
  //-----------------------------functions for delete documents from firebase storage-------------------

  const handleClickDel = (e) => { //dalete documents
    setLoading(true);
    const delDocRef = ref(storage, `/homelessDocuments/${profileSlug}/${e.target.id}`)
    deleteObject(delDocRef).then(() => {
      const text = "' קובץ" + e.target.id + " נמחק בהצלחה ' "
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
      const text = "' קובץ" + e.target.id + " נמחק בהצלחה ' "
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

          <div id="profileNav" className='ml-auto'>
            <ul className="navbar-nav">
              <li className="nav-item">

                <NavDropdown title="טפסים חתומים" id="collasible-nav-dropdown1" style={{ right: '50%' }}>

                  {
                    ((formsData.length === 0) && (<NavDropdown.Item className="text-end">

                      <a> אין טפסים חתומים </a>

                    </NavDropdown.Item>)) || (formsData && formsData.map((val, index) => (
                      <NavDropdown.Item key={index} className="text-end">
                        <button id={val} style={{ width: '20%' }} className="deleteBtn" onClick={handleClickDelForm}> מחק</button>
                        <button id={val.id} title={val} onClick={handleClickSign} className="btn2" >{val}</button>
                      </NavDropdown.Item>
                    )))

                  }
                </NavDropdown>
              </li>
                <li className="nav-item">
                  <NavDropdown title="מסמכים" id="collasible-nav-dropdown1" style={{ right: '30%' }}>
                    {
                      ((data.length === 0) && (<NavDropdown.Item className="text-end" >

                        <a > אין מסמכים </a>

                      </NavDropdown.Item>)) || (
                        data && data.map((val, index) => (
                          <NavDropdown.Item key={index} className="text-end">
                            <button id={val} style={{ width: '20%' }} onClick={handleClickDel} className="deleteBtn"> מחק</button>
                            <button id={val.id} title={val} onClick={handleClickDoc} className="btn2">{val}</button>
                          </NavDropdown.Item>
                        ))
                      )
                    }
                  </NavDropdown>
                </li>

                <li className="nav-item">


                  <NavDropdown title="רקע" id="collasible-nav-dropdown1" style={{ left: '50%' }}>

                    {

                      !homeless.background &&

                      <NavDropdown.Item className="text-end">

                        <button id='background' className="btn2" onClick={handleClickHis}>רקע כללי</button>

                      </NavDropdown.Item>
                    }
                    {

                      !homeless.therapeutic_history &&

                      <NavDropdown.Item className="text-end">

                        <button id='therapeutic_history' className="btn2" style={{ float: 'right' }} onClick={handleClickHis}>רקע טיפולי</button>

                      </NavDropdown.Item>
                    }{
                      !homeless.addiction_History &&

                      <NavDropdown.Item className="text-end">

                        <button id='addiction_History' className="btn2" style={{ float: 'right' }} onClick={handleClickHis}>רקע התמכרותי</button>

                      </NavDropdown.Item>

                    }{
                      !homeless.criminalRecord &&

                      <NavDropdown.Item className="text-end">

                        <button id='criminalRecord' className="btn2" style={{ float: 'right' }} onClick={handleClickHis}>רקע פלילי</button>

                      </NavDropdown.Item>

                    }{
                      !homeless.psycoticPast &&

                      <NavDropdown.Item className="text-end">

                        <button id='psycoticPast' className="btn2" style={{ float: 'right' }} onClick={handleClickHis}>רקע פסיכיאטרי</button>

                      </NavDropdown.Item>
                    }
                  </NavDropdown>
                </li>
              

              <li className="nav-item">
                {/* <NavItem> */}
                <button style={{ color :'white',backgroundColor : '#1f1f1f',margin: '0.5rem', left: "50%", position: "relative" }} onClick={handleClickGen}>מידע כללי</button>
                {/* </NavItem> */}

              </li>
             

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default ProfileNav;