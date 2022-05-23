
import { async } from '@firebase/util';
import {collection,addDoc} from 'firebase/firestore/lite';
import React, { Component } from 'react';
import { useState , useEffect} from 'react';
import {db} from '../firebase';
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

  const usersCollectionRef = collection(db, "homelesses");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge), date: NewDate , time: NewTime, ID: NewID, Tel: NewTel, Address: NewAddr, background: NewBack, WhereHeHasSlept: NewHow, ReasonForAsylum: NewWhy, contact: NewMas, TherapeuticHistory: NewHes  });
  };

  return (
    <div className="Add">
   <p><h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1></p>
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
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
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
    </div>
  );
}
  export default Add;

