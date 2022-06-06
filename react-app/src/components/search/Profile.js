import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase"
import {  collection, getDocs ,getDoc, onSnapshot, doc } from "firebase/firestore";
import "./Profile.css" ;
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";


export function Profile() {
  let { profileSlug } = useParams();
  const [homeless, setHomeless] = useState([]);
  const [reports, setReports] = useState([]);
  const [history, setHistory] = useState([]);
  const [files, setFiles] = useState([]);
  const [homelessDocuments, setHomelessDocuments] = useState([]);
  const [signedForms, setSignedForms] = useState([]);
  const col = collection(firestore, "homelesses");


  useEffect(() => {
   const current = profileSlug;
  }, [profileSlug]);
  const homelessinfo = doc(firestore , "homelesses" , profileSlug)
  const homelessReports = doc(firestore , "Reports" , profileSlug)
  const homelessHistory = doc(firestore , "history" , profileSlug)
  const homelessDoc = doc(firestore , "documents" , profileSlug)
  const homelessSignedForms = doc(firestore , "signedForms" , profileSlug)
  
    onSnapshot(homelessinfo , (doc) =>{
      setHomeless(doc.data());
    })
    onSnapshot(homelessReports , (doc) =>{
      setReports(doc.data());
    })
    onSnapshot(homelessHistory , (doc) =>{
      setHistory(doc.data());
    })
    onSnapshot(homelessDoc , (doc) =>{
      setHomelessDocuments(doc.data());
    })
    onSnapshot(homelessSignedForms , (doc) =>{
      setSignedForms(doc.data());
    })
  

function handleClickRe(e) { 
  const container = document.getElementById('demo');
  const text = document.createTextNode(reports.re1);
  container.appendChild(text); 
}
function handleClickHis(e) { 
  const container = document.getElementById('demo');
  const text = document.createTextNode(history.background);
  container.appendChild(text); 
}


function handleClickDoc(e) { 
  const container = document.getElementById('demo');
  const text = document.createTextNode(homelessDocuments.doc1);
  container.appendChild(text); 
}
function handleClickSign(e) { 
  const container = document.getElementById('demo');
  const text = document.createTextNode(signedForms.sign1);
  container.appendChild(text); 
}

  return (
    
    <div className="home">
      <div class="container">
   
        <div className="right">
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
        </div>
      </div>  
      
       
        <div className="body1">     
        <Link to="/report">
          <button>הוספת דו״ח</button>
        </Link>  
        <div className="tab_4 ">
       
{/* <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
      רקעים
    </Dropdown.Toggle>

    <Dropdown.Menu variant="dark">
      <Dropdown.Item href="#/action-1" active>
           רקע 1
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      <Dropdown.Divider />
     <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown> */}

<DropdownButton
    id="dropdown1"
    variant="secondary"
    menuVariant= "light"
    title="רקע"
    className="dropdown dropleft"
   
  >
    <Dropdown.Item href="#/action-1" active>
     <a onClick={handleClickHis}>  רקע פסיכולוגי </a>
    
    </Dropdown.Item>
    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
  </DropdownButton>


  <DropdownButton
    id="dropdown2"
    variant="secondary"
    menuVariant="dark"
    title="דוחות"
    className="mt-2"
  >
    
    <Dropdown.Item href="#/action-1" active >
      <a onClick={handleClickRe}> דוח 1 </a>
    </Dropdown.Item>
   
    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
 
 
  </DropdownButton>


  <DropdownButton
    id="dropdown3"
    variant="secondary"
    menuVariant="dark"
    title="מסמכים"
    className="mt-3"
  >
    <Dropdown.Item href="#/action-1" active>
    <a onClick={handleClickDoc}> מסמך 1 </a>
      
    </Dropdown.Item>
    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
  </DropdownButton>
  <DropdownButton
    id="dropdown4"
    variant="secondary"
    menuVariant="dark"
    title="טפסים חתומים"
    className="mt-4"
  >
    <Dropdown.Item href="#/action-1" active>
    <a onClick={handleClickSign}>  טופס 1 </a>
    
    </Dropdown.Item>
    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item> */}
  </DropdownButton>
   

        {/* <Tab.Container id="right-tabs"  defaultActiveKey="first"> 
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column ml-auto">
        <Nav.Item>
          <Nav.Link eventKey="first">רקעים</Nav.Link>
         
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">דוחות</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="thrird">מסמכים</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="fourth">טפסים חתומים</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
   

    <Col sm={9} className = "kdd ml-auto">
      <Tab.Content>
        <Tab.Pane eventKey="first">
               <Add />
         
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <Add />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container> */}
  
</div>
<div className= "kk" id="demo">

</div>    
</div>   
      </div>

   
   
  );
}

export default Profile;