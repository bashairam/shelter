
import { async } from '@firebase/util';
import {collection,addDoc} from 'firebase/firestore';
import React, { Component } from 'react';
import { useState , useEffect} from 'react';
import {firestore} from '../firebase';
import "./Add.css";

function Add (){
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [NewDate, setNewDate] = useState(0);
  const [NewTime, setNewtime] = useState(0);
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState(0);
  const [NewAddr, setNewAddr] = useState("");
  const [NewBack, setNewBack] = useState("");
  const [NewHow, setNewHow] = useState("");
  const [NewWhy, setNewWhy] = useState("");
  const [NewMas, setNewMas] = useState("");
  const [NewHes, setNewHes] = useState("");
  const [checked,setChecked]=useState(false);

  const usersCollectionRef  = collection(firestore, "homelesses");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge), date: NewDate , time: NewTime, ID: NewID, Tel: NewTel, Address: NewAddr, background: NewBack, WhereHeHasSlept: NewHow, ReasonForAsylum: NewWhy, contact: NewMas, TherapeuticHistory: NewHes  });
  };

  return (
    <div className="Add">
   <h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1>
   <br /><br />
      <h6>תאריך</h6>
      <input
        type="date"
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      />
      <h6>שעת הגעה</h6>
      <input
        type="time"
        onChange={(event) => {
          setNewtime(event.target.value);
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
      <h6>טלפון</h6>
        <input
        onChange={(event) => {
          setNewTel(event.target.value);
        }}
      />
      <h6>כתובת</h6>
        <input
        onChange={(event) => {
          setNewAddr(event.target.value);
        }}
      />
      <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
        <input
        onChange={(event) => {
          setNewBack(event.target.value);
        }}
      />
 <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
        <input
        onChange={(event) => {
          setNewHow(event.target.value);
        }}
      />
       <h6>גורם מפנה / פנייה עצמאית</h6>
        <input
        onChange={(event) => {
          setNewWhy(event.target.value);
        }}
      />
       <h6>(אם יש) איש קשר / גורם בקהילה</h6>
        <input
        onChange={(event) => {
          setNewMas(event.target.value);
        }}
      />
       <h6>היסטוריה טיפולית</h6>
        <input
        onChange={(event) => {
          setNewHes(event.target.value);
        }}
      />
      <div className="button"><button style={{backgroundColor: '#343741', borderColor : '#343741', color : '#ffff' }}  onClick={createUser}>הוספה</button></div>

      
    </div>
  );
}
  export default Add;

