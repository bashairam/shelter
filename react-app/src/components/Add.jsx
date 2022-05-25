
import { async } from '@firebase/util';
import {collection,addDoc, getDocs, doc,setDoc, Timestamp} from 'firebase/firestore/lite';
import React, { Component } from 'react';
import { useState , useEffect} from 'react';
import { alignPropType } from 'react-bootstrap/esm/types';
import {firestore} from '../firebase';
import "./Add.css";

  function refreshPage() {
    window.location.reload(false);
  }

function Add (){
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [NewDate, setNewDate] = useState(0);
  const [NewTime, setNewtime] = useState(0);
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState(0);
  const [NewAddr, setNewAddr] = useState("");
  const [NewBack, setNewBack] = useState("");
  const [NewContTel, setNewcomtTel] = useState(0);
  const [NewcriHis, setNewcriHis] =useState(false);

  const [NewHow, setNewHow] = useState("");
  const [NewWhy, setNewWhy] = useState("");
  const [NewMas, setNewMas] = useState("");
  const [NewHes, setNewHes] = useState("");
  const [checked,setChecked]=useState(false);

  const usersCollectionRef = collection(firestore, "history");


  const createUser = async () => {
    await setDoc(doc(firestore, "homelesses",NewID ), {
     name: newName,
     age: Number (newAge),
     date: Timestamp.fromDate(new Date(NewDate)),
     personalPhone : Number(NewTel),
     cntactPhone : Number(NewMas),
     formFillerId: 0,
     parentsAssress:NewAddr,
     referrerId:NewID
   });
   await addDoc(usersCollectionRef, { background: NewBack,  
    psycoticPast: NewHes, criminalRecord:NewcriHis });

   refreshPage()

 };


  return (
    <div className="Add">
   <p><h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1></p>
   <br /><br />
   <form onSubmit={(e)=>e.preventDefault()}>
      <h6>תאריך</h6>
      <input
        type="date"
        onChange={(event) => {
          setNewDate(event.target.value);
        }}
      />
      <br /><br />
      <h6>שעת הגעה</h6>
      <input
        type="time"
        onChange={(event) => {
          setNewtime(event.target.value);
        }}
      />
      <br /><br />
      <h6>(כולל משפחה)שם</h6>
      <input
      type="text"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <br /><br />
      <h6>גיל</h6>
        <input
        type="number"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <br /><br />
      <h6>ת"ז</h6>
        <input
        type="number"
        onChange={(event) => {
          setNewID(event.target.value);
        }}
      />
      <br /><br />
      <h6>טלפון</h6>
        <input
        type="tel"
        onChange={(event) => {
          setNewTel(event.target.value);
        }}
      />
      <br /><br />
      <h6>כתובת</h6>
        <input
        onChange={(event) => {
          setNewAddr(event.target.value);
        }}
      />
      <br /><br />
      <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
      <textarea rows="5" 
                 onChange={(event) => {
          setNewBack(event.target.value);
        }}> </textarea>
      <br /><br />
 <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
        <input
        onChange={(event) => {
          setNewHow(event.target.value);
        }}
      />
      <br /><br />
       <h6>גורם מפנה / פנייה עצמאית</h6>
        <input
        onChange={(event) => {
          setNewWhy(event.target.value);
        }}
      />
      <br /><br />
       <h6>(אם יש) איש קשר / גורם מלווה בקהילה</h6>
        <input
        onChange={(event) => {
          setNewMas(event.target.value);
        }}
      />
        <br /><br />
       <h6>האם יש עבר פלילי:</h6>
        <input
        type="checkbox" onChange={(event) => {
          setNewcriHis(event.target.value);
        }}  
        
      />
      <br /><br />
       <h6>היסטוריה טיפולית</h6>
       <textarea rows="7" 
                 cols = "70"  
                 onChange={(event) => {
          setNewHes(event.target.value);
        }}> </textarea><input type="file" />
      <br /><br />
      <p><h4> :בדיקת כל השלבים </h4></p>

      <table id = "Table">
          <tr>
            <th>שלב לדוגמא</th>
            <th></th>
            <th>V</th>
          </tr>
          <tr>
            <td>מילוי טופס קליטה עם הצעיר, מחוץ לשלטר. בבקשה למלא את הטופס במלואו, ובמידה ואין מה למלא</td>
            <td></td>
            <td><input type="checkbox" onChange={(event) => {
          setChecked(event.target.value);
        }}  />
            </td>
          </tr>
          <tr>
            <td>לדאוג שהצעיר קורא את הנהלים וחותם עליהם</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked}  />
            </td>
          </tr>
          <tr>
            <td> תזכורת לצעיר שהקבלה היא ללילה ולמחרת תתקיים שיחה עם הצוות המוביל לגבי ההמשך</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked}  />
            </td>
          </tr>
          <tr>
            <td>דיווח לכונן טלפונית + שליחת הטופס</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked}  />
            </td>
          </tr>
          <tr>
            <td>חיפוש בכל מה שהצעיר הביא איתו ונעילת תרופות בחדר עו"ס-רכז במידת הצורך</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked} />
            </td>
          </tr>
          <tr>
            <td>צילום ת.ז. במכונת צילום</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked}  />
            </td>
          </tr>
          <tr>
            <td>ללוות את הצעיר לחדר ולראות שהוא מסדר את המצעים והמיטה</td>
            <td></td>
            <td><input type="checkbox" defaultChecked={checked}  />
            </td>
          </tr>
        </table>
        <br /><br />
        <br /><br />

        <h6>ממלא הטופס</h6>
        <select className="select" >
          <option >1</option>
          <option >2</option>
          <option >3</option>
          <option >4</option>
          <option >5</option>
          <option >6</option>
          <option >7</option>
          <option >8</option>
          <option >9</option>
          <option >10</option>
          <option >11</option>
          <option >12</option>
</select> 


        </form>
        <button name='button' onClick={createUser}>הוספת הצעיר</button>

    </div>
  );
}
  export default Add;