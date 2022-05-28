import { async } from '@firebase/util';
import { Alert } from 'bootstrap';
import {collection,addDoc, getDocs, doc,setDoc, Timestamp} from 'firebase/firestore';
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
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState("");
  const [NewContTel, setNewContTel] = useState("");
  const [NewAddr, setNewAddr] = useState("");
  const [NewWhy, setNewWhy] = useState("");
  const[newformFiller,setNewValue]=useState("")

  const [NewBack, setNewBack] = useState("");
  const [NewHis, setNewHis] = useState("");
  const [NewcriHis, setNewcriHis] =useState("");
  const [NewPsyHis, setNewPsyHis] =useState("");
  const [NewaddHis, setNewaddHis] =useState("");// addiction
  const [Newinstitutions, setNewinstitutions] = useState("");//institution
  const [NewHow, setNewHow] = useState("");
  const [checked,setChecked]=useState(false);
  const [NewStage, setNewStage] =useState("");
  const [NewRoom, setNewRoom] =useState("");

  //const usersCollectionRef = collection(firestore, "history");



  const createUser = async () => {
    await setDoc(doc(firestore, "homelesses",NewID ), {
     name: newName,
     age: Number (newAge),
     date: Timestamp.fromDate(new Date() ),
     personalPhone : (NewTel),
     cntactPhone : (NewContTel),
     formFiller: newformFiller,
     parentsAssress:NewAddr,
     referrer:NewWhy,
   });

   await setDoc(doc(firestore, "history",NewID ), { 
     background: NewBack,  
     Therapeutic_history: NewHis,
     psycoticPast: NewPsyHis, 
     criminalRecord:NewcriHis,
     addiction_History:NewaddHis,
     Prominent_institutions:Newinstitutions
     });
     await setDoc(doc(firestore, "inHomelesses",NewID ), { 
      Stage: NewStage,
      Room: NewRoom,
      date: Timestamp.fromDate(new Date() ),

      });
    refreshPage()
 };

  return (
  <div  className="Add">
    <h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1>
    <br /><br />
    <form onSubmit={(e)=>e.preventDefault()}>

      <h6>תאריך</h6>
      <input
        style={{width : '100%'}}
        type="date"
        />
      <br /><br />

      <h6>שעת הגעה</h6>
      <input
       style={{width : '100%'}}
       type="time" />
      <br /><br />

      <h6>(כולל משפחה)שם</h6>
      <input
      type="text"
      style={{width : '100%'}}
      onChange={(event) => {
          setNewName(event.target.value);
        }} />
      <br /><br />

      <h6>גיל</h6>
        <input
        type="number"
        style={{width : '100%'}}
        onChange={(event) => {
          setNewAge(event.target.value);
        }} />
      <br /><br />

      <h6>ת"ז</h6>
        <input
        style={{width : '100%'}}
        maxlength="9"
        onChange={(event) => {
          setNewID(event.target.value);
        }} />
      <br /><br />

      <h6>טלפון</h6>
        <input
        style={{width : '100%'}}
        type="number"
        maxlength="10"
        onChange={(event) => {
          setNewTel(event.target.value);
        }} />
      <br /><br />

      <h6>כתובת</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewAddr(event.target.value);
        }} />
      <br /><br />

      <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
      <textarea rows="5" 
                onChange={(event) => {
                  setNewBack(event.target.value); }}> </textarea>
      <br /><br />

      <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewHow(event.target.value);
        }} />
      <br /><br />

       <h6>גורם מפנה / פנייה עצמאית</h6>
        <input
        style={{width : '100%'}}
        onChange={(event) => {
          setNewWhy(event.target.value);
        }} />
      <br /><br />

       <h6>(אם יש) טלפון איש קשר / גורם מלווה בקהילה</h6>
        <input
        style={{width : '100%'}}
        maxlength="10"
        onChange={(event) => {
          setNewContTel(event.target.value);
        }} />
        <br /><br />
       
       <h6>היסטוריה טיפולית</h6>
       <textarea rows="5" 
                 cols = "70"  
                 onChange={(event) => {
                   setNewHis(event.target.value);}}> </textarea>
       <br /><br /> 

       <h6>(אם כן פרט) :האם יש עבר פלילי              
       </h6>
       <textarea rows="5" 
                 cols = "70"  
                 name="locationId"
                 onChange={(event) => {
                   setNewcriHis(event.target.value);}}> </textarea>
          
      <br /><br />


       <h6> (אם כן פרט) :האם יש אבחנה או עבר פסיכוט  
       
     </h6>
       <textarea rows="5" 
                 cols = "70"  
                 onChange={(event) => {
                  setNewPsyHis(event.target.value);}}> </textarea>
        <br /><br />

       <h6>      האם יש התמכרות פעילה או עבר של התמכרות
       
  </h6>
       <textarea rows="5" 
                 cols = "70"  
                 onChange={(event) => {
                  setNewaddHis(event.target.value); }}> </textarea>
        <br /><br />

        <h6> מוסדות בולטים בעבר</h6> 
         <input
            style={{width : '100%'}}
            onChange={(event) => {
              setNewinstitutions(event.target.value); }} />
        <br /><br />        <br /><br />

        <h6> ?האם ברצונך להכניס הצעיר לשלטר  <input
        type="checkbox"/></h6>

         <select 
                 style={{width : '100%'}}
              onChange={(e) => setNewStage(e.target.value)}>
              <option >בחר חדר</option>
              <option >חדר 1</option>
              <option >חדר 2</option>
              <option>חדר 3 </option>
              <option>חדר 4</option>
              <option >חדר 5</option>
            </select>
            <br /><br />

        <select 
                         style={{width : '100%'}}
              onChange={(e) => setNewStage(e.target.value)}>
              <option value=''>בחר שלב</option>
              <option value="שלב קליטה">שלב קליטה</option>
              <option value="שלב א׳">שלב א׳</option>
              <option value="שלב ב׳">שלב ב׳</option>
              <option value="מסלול חיפוש עבודה">מסלול חיפוש עבודה</option>
              <option value="מסלול לילות">מסלול לילות</option>
            </select>
      
        <br /><br />

        <h6>ממלא הטופס</h6>
        <input  
                onChange={(event) => {
                  setNewValue(event.target.value); }}/>
        </form>

        <button name='button' onClick={createUser}   >הוספת הצעיר</button>
    </div>
  );
}
  export default Add;