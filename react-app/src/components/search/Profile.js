import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../firebase"
import {onSnapshot, doc } from "firebase/firestore";
import "./Profile.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { getDownloadURL, ref, uploadBytes, listAll, list, uploadBytesResumable } from "firebase/storage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'firebase/storage';
import ReactDOM from 'react-dom/client';
import LoadingScreen from 'react-loading-screen';
import ProfileNav from "./ProfileNav";
import AllReport from "../AllReport";


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
  let enterTime=""
  let exitDate = ""
  let exitTime=""


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
 
  {homeless.date && <tr > תאריך כניסה :  {enterDate}   </tr>}

  {/*Enter Time*/}
  {homeless.date && <tr  > זמן כניסה :  {enterTime}    </tr>}

  {/* Room */}
  { (!homeless.exitDate && inHomeless.room && <tr> מספר חדר בשלטר :  {inHomeless.room} </tr>)}
   
  {/* Stage */}
  {(!homeless.exitDate && inHomeless.stage && <tr>שלב בשלטר :  {inHomeless.stage} </tr>) }
 
  {/*referrer*/}
  {homeless.referrer && <tr>גורם פנייה : {homeless.referrer}  </tr>}
 
  {/*Contact */}
  {homeless.contact && <tr>טלפון איש קשר :  {homeless.contact}</tr>}
 
  {/*Sleeping place */}
  {homeless.sleepingPlace && <tr>מקום שינה אחרון :  {homeless.sleepingPlace} </tr>}

  {/*name Of prominent institutions*/}
  {homeless.nameOf_prominent_institutions && <tr style={{ color: 'rgb(247, 116, 9)' , fontWeight :'600'}}> המסדות שהיה בהן בעבר :  {homeless.nameOf_prominent_institutions}</tr>  }
  
  {/*Exit Date*/}
  {homeless.exitDate && <tr> תאריך יצאה :  {exitDate}   </tr>}

   {/*Enter Time*/}
  {homeless.exitDate && <tr> זמן יצאה :  {exitTime}   </tr>}

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

  const handleClickUploadSigned = (e) => {
    e.preventDefault()
    setLoading(true);
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
              {homeless.formFiller && <div>{homeless.formFiller}<i className="bi4 bi-journal-check fa-fw" data-toggle="tooltip" data-placement="bottom" title="עובד סוציאלי"></i></div>}

            </div>

          </div>
          <div className="cli">
            <Link to={"/updateDetailsHomeless"} state={{ id: profileSlug }}>
              <button className="me-0 " style={{ right: "53%" }} > עדכון פרטים<i className="bi5 bi-pencil fa-fw"></i> </button>
            </Link>

            <Link to={"/report"} state={{ id: profileSlug, method: "create" }}>
              <button className="me-0 " > הוספת דוח<i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>
            </Link>

            <Link to={"/allreports"} state={{ id: profileSlug }}>
              <button className="me-0 " >  כל הדוחות<i className="bi5 bi-file-earmark-plus fa-fw"></i> </button>

            </Link>


          </div>

          <div className="cli1" >
            <label htmlFor="formFile" className="btn" data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת מסמכים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
            <input type="file" id="formFile" title="doc" style={{ buttom: '50%' }} onChange={handleClickUpload} />
          </div>

          <div className="cli2">
            <label htmlFor="formFile" className="btn" style={{ buttom: '2%' }} data-toggle="tooltip" data-placement="bottom" title="נא לבחור קובץ">העלאת טפסים חתומים <i className="bi5 bi-cloud-upload fa-lg"></i></label>
            <input type="file" id="formFile" title="sign" onChange={handleClickUpload} />

          </div>



        </div>
      </div>
      <div className="ff">
        {/* <ColoredLine color="rgb(247, 116, 9)" /> */}
        <hr className="new4" />
      </div>
      <div className="tab_4 ">

        <ProfileNav />

        <div id="demo">
          {history.background}
        </div>

      </div>

    </div>

    

  );
    }
    
export default Profile;