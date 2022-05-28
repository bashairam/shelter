
import {collection,setDoc,doc,Timestamp} from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {firestore} from '../firebase';
import "./Add.css";
import { useNavigate } from 'react-router-dom';

function Add (){
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [NewDate, setNewDate] = useState(0);
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState(0);
  const [NewContTel, setNewContTel] = useState(0);
  const [NewAddr, setNewAddr] = useState("");
  const [NewRoom, setNewRoom] = useState("");
  const [NewBed, setNewBed] = useState("");
  const [NewStage, setNewStage] = useState("");

  const navigate = useNavigate();


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
    await setDoc(doc(firestore, "history",NewID ), {
      background : "",
      criminalRecord : "",
      psycoticPast: "",
    });
    await setDoc(doc(firestore, "inHomelesses",NewID ), {
      room : Number(NewRoom),
      bed : Number(NewBed),
      stage: Number(NewStage),
      entryDate :  Timestamp.fromDate(new Date(NewDate)), 
      mentorId : 0
    });
    navigate("/");
  };


  return (
    <div  className="Add">
   <h1 className="text-center"> טופס קליטת צעיר, היכרות ראשונית</h1>
   <br /><br />
      <h6>תאריך</h6>
      <input

        type="date"
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      />
      <h6>(כולל משפחה)שם</h6>
      <input
  
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <h6>גיל</h6>
        <input
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <h6>ת"ז</h6>
        <input
        onChange={(event) => {
          setNewID(event.target.value);
        }}
      />
      <h6>טלפון אישי</h6>
        <input
        onChange={(event) => {
          setNewTel(event.target.value);
        }}
      />
      <h6>טלפון איש קשר</h6>
        <input
        onChange={(event) => {
          setNewContTel(event.target.value);
        }}
      />
      <h6>כתובת</h6>
        <input
        onChange={(event) => {
          setNewAddr(event.target.value);
        }}
      />
      <h6>חדר</h6>
        <input
        onChange={(event) => {
          setNewRoom(event.target.value);
        }}
      />
      <h6>מיטה</h6>
        <input
        onChange={(event) => {
          setNewBed(event.target.value);
        }}
      />
      <h6>שלב</h6>
        <input
        onChange={(event) => {
          setNewStage(event.target.value);
        }}
      />
      <div className="button"><button style={{backgroundColor: '#343741', borderColor : '#343741', color : '#ffff' }}  onClick={createUser}>הוספה</button></div>

      
    </div>
  );
}
  export default Add;

