
import {collection,setDoc,doc,Timestamp} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {firestore} from '../firebase';
import "./Add.css";

function Add (){
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [NewDate, setNewDate] = useState(0);
  const [NewTime, setNewtime] = useState(0);
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState(0);
  const [NewContTel, setNewContTel] = useState(0);
  const [NewAddr, setNewAddr] = useState("");
  const [NewBack, setNewBack] = useState("");
  const [NewHow, setNewHow] = useState("");
  const [NewWhy, setNewWhy] = useState("");
  const [NewMas, setNewMas] = useState("");
  const [NewHes, setNewHes] = useState("");
  const [checked,setChecked]=useState(false);

  const usersCollectionRef  = collection(firestore, "homelesses");

  const createUser = async () => {
     await setDoc(doc(firestore, "homelesses",NewID ), {
      name: newName,
      age: Number (newAge),
      date: Timestamp.fromDate(new Date(NewDate)),
      personalPhone : Number(NewTel),
      cntactPhone : Number(NewContTel),
      formFillerId: 0,
      parentsAssress:NewAddr,
      referrerId:0
    });
  };

  return (
    <div  className="Add">
   <h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1>
   <br /><br />
      <h6>תאריך</h6>
      <input
        style={{width : '100%'}}
        type="date"
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      />
      <h6>(כולל משפחה)שם</h6>
      <input
      style={{width : '100%'}}
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <h6>גיל</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <h6>ת"ז</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewID(event.target.value);
        }}
      />
      <h6>טלפון אישי</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewTel(event.target.value);
        }}
      />
      <h6>טלפון איש קשר</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewContTel(event.target.value);
        }}
      />
      <h6>כתובת</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewAddr(event.target.value);
        }}
      />
      <div className="button"><button style={{backgroundColor: '#343741', borderColor : '#343741', color : '#ffff' }}  onClick={createUser}>הוספה</button></div>

      
    </div>
  );
}
  export default Add;

