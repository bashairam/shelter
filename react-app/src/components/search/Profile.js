import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import { onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import LoadingScreen from 'react-loading-screen';
import ProfileNav from "./ProfileNav";

export function Profile() {

  //-------------------------variables-----------------------------------------------
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [inHomeless, setInHomeless] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [formsData, setFormsData] = useState([])
  const [loading, setLoading] = useState(false);
  const homelessinfo = doc(firestore, "homelesses", profileSlug)
  const homelessReports = doc(firestore, "reports", profileSlug)
  const homelessHistory = doc(firestore, "history", profileSlug)
  const InHomelessInfo = doc(firestore, "inHomelesses", profileSlug)

  let docRef = null
  const dataa = []
  const forms = []
  let enterDate = ""
  let enterTime = ""
  let exitDate = ""
  let exitTime = ""


  //------------------------------------------------------------------------------------------------- 

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


  })

  onSnapshot(InHomelessInfo, (doc) => {
    setInHomeless(doc.data());
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


  //------------------------------functions to upload the documents to firebase storage----------------------------------------

  const handleClickUpload = (e) => {
    e.preventDefault()
    setLoading(true);
    const identifier = e.target.title
    const file = e.target.files[0]
    console.log(e.target.title)
    if (!file) {
      setLoading(false);
      alert("נא לבחור קובץ קודם")
      return
    }
    if (!identifier) {
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
      const text = "' קובץ" + e.target.id + " נשמר בהצלחה ' "
      alert(text)
      window.location.reload()
    }).catch((error) => {
      alert("בבקשה נסה שוב")
      console.error(error)
    });
  }

  //------------------------------functions to upload the documents to firebase storage----------------------------------------

  const handleClickUploadDoc = (e) => {
    e.preventDefault()
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      alert("נא לבחור קובץ קודם")
      return
    }
    docRef = ref(storage, `/homelessDocuments/${profileSlug}/${file.name}`) //choose a differents name for the docs
    uploadBytes(docRef, file).then(() => {
      setLoading(false);
      const text = "  קובץ  '  " + file.name + "  ' נשמר בהצלחה "
      alert(text)
      window.location.reload()

    })
  }

  const handleClickUploadSigned = (e) => {
    e.preventDefault()
    setLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setLoading(false);
      alert("נא לבחור קובץ קודם")
      return
    }
    docRef = ref(storage, `/homelessSignedForms/${profileSlug}/${file.name}`) //choose a differents name for the docs
    uploadBytes(docRef, file).then(() => {
      setLoading(false);
      const text = "  קובץ  '  " + file.name + "  ' נשמר בהצלחה "
      alert(text)
      window.location.reload()

    })


    navigate('./search');

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
            {/* name */}
           
            <div className="subInfo" data-toggle="tooltip" data-placement="bottom" title="שם הצעיר">

              <Link to={`/updateDetailsHomeless/${profileSlug}`} ><button className="btn5" data-toggle="tooltip" data-placement="bottom" title="עדכון פרטים"><i className="fa-1 bi-pencil-fill fa-fw"></i></button> </Link>
              {homeless.name}

            </div>
            {/* <div className="arrow-right"> </div>
             <div className="arrow-down"></div>
              */}
            <div className="infoDetails">

              {/* age */}
              {homeless.age && <tr>  {homeless.age}  <i className="bi1 bi-person fa-fw" data-toggle="tooltip" data-placement="bottom" title="גיל"></i></tr>}

              {/* address */}
              {homeless.parentsAddress && <tr> {homeless.parentsAddress}  <i className="bi2 bi-house-door fa-fw" data-toggle="tooltip" data-placement="bottom" title="כתובת"></i>  </tr>}

              {/* phone */}
              {homeless.personalPhone && <tr>{homeless.personalPhone} <i className="bi3 bi-telephone fa-fw" data-toggle="tooltip" data-placement="bottom" title="טלפון"></i></tr>}

              {/* mentor */}
              {homeless.formFiller && <tr>{homeless.formFiller} <i className="bi4 bi-journal-text" data-toggle="tooltip" data-placement="bottom" title="עובד סוציאלי"></i></tr>}

              {/* status */}
              {(homeless.exitDate && <tr> יצא משלטר<i className="bi4 bi-door-open" data-toggle="tooltip" data-placement="bottom" title="סטטוס"></i></tr>)
                || (homeless.date && <tr>נמצא בשלטר<i className="bi4 bi-person-check" data-toggle="tooltip" data-placement="bottom" title="סטטוס"></i></tr>)
              }

            </div>
          </div>


          <div className="cli">

            {inHomeless != null && <Link to={`/report/create/${profileSlug}`} >
              <button className="me-1 "  > הוספת דוח  <i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>

            </Link>}

            <Link to={`/allreports/${profileSlug}`}>
              <button className="me-0 " >כל הדוחות <i className="bi5 bi-folder"></i></button>
            </Link>

          </div>



          <div className="cli1" >
            <label for="formFile" className="btn" data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת מסמכים <i className="bi6 bi-cloud-upload fa-lg" style={{ left: '10%' }}></i></label>
            <input type="file" id="formFile" title="doc" onChange={handleClickUploadDoc} />
          </div>

          <div className="cli2">
            <label for="formFile" className="btn" data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
            <input type="file" id="formFile" title="sign" onChange={handleClickUploadSigned} />
          </div>





        </div>
      </div>
      <div className="ff">

        <hr className="new4" />
      </div>





      <div className="tab_4 ">

        <ProfileNav />

        <div style = {{alignContent:'center'}} id="demo">
          {history.background}


        </div>

      </div>

    </div>



  );
}

export default Profile;