import React from "react";
import "./User.css"
import { getDetailsUserById, updateDetailsUserById,auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from 'react-router-dom'
import "./DetailsHomeless.css";


class DetailsHomeless extends React.Component {
  
  constructor(props) {
    super(props);
    
   
    
  }



  

  
  
    

  render() {
    return(
    <div  className="Add">
    <h1 className="text-center mt-5"> טופס עדכון פרטי צעיר </h1>
    <br /><br />
    <form >

      <h6>(כולל משפחה) שם</h6>
      <input
      type="text"
      style={{width : '100%'}}
     />
      <br /><br />

      <h6>גיל</h6>
        <input
        type="number"
        style={{width : '100%'}}
         />
      <br /><br />

      <h6>ת"ז</h6>
        <input
        style={{width : '100%'}}
        maxlength="9"
         />
      <br /><br />

      <h6>טלפון</h6>
        <input
        style={{width : '100%'}}
        type="number"
        maxlength="10"
        />
      <br /><br />

      <h6>כתובת</h6>
        <input
        style={{width : '100%'}}
        />
      <br /><br />

      <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
      <textarea rows="5" 
                > </textarea>
      <br /><br />

      <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
        <input
        style={{width : '100%'}}
        />
      <br /><br />

       <h6>גורם מפנה / פנייה עצמאית</h6>
        <input
        style={{width : '100%'}}
        />
      <br /><br />

       <h6>(אם יש) טלפון איש קשר / גורם מלווה בקהילה</h6>
        <input
        style={{width : '100%'}}
        maxlength="10"
        />
        <br /><br />
       
       <h6>היסטוריה טיפולית</h6>
       <textarea rows="5" 
                 cols = "70"  
                > </textarea>
       <br /><br /> 

       <h6>(אם כן פרט) :האם יש עבר פלילי              
       </h6>
       <textarea rows="5" 
                 cols = "70"  
                 name="locationId"
                 > </textarea>
          
      <br /><br />


       <h6> (אם כן פרט) :האם יש אבחנה או עבר פסיכוט  
       
     </h6>
       <textarea rows="5" 
                 cols = "70"  
                 > </textarea>
        <br /><br />

       <h6>      האם יש התמכרות פעילה או עבר של התמכרות
       
  </h6>
       <textarea rows="5" 
                 cols = "70"  
                > </textarea>
        <br /><br />

        <h6> מוסדות בולטים בעבר</h6> 
         <input
            style={{width : '100%'}}
             />
        <br /><br />        <br /><br />

        <h6> ?האם ברצונך להכניס את הצעיר לשלטר  <input
        type="checkbox"/></h6>

         <select 
                 style={{width : '100%'}}
              >
              <option value= {null} >בחר חדר</option>
              <option value= {1} >חדר 1</option>
              <option value={2} >חדר 2</option>
              <option value={3}>חדר 3 </option>
              <option value={4}>חדר 4</option>
              <option value={5} >חדר 5</option>
            </select>
            <br /><br />

        <select 
                         style={{width : '100%'}}
             >
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
                // onChange={(event) => {
                //   setNewValue(event.target.value); }}
                />
        </form>

        <button name='button'    >עדכון</button>
    </div>
    );
  }
}

export default DetailsHomeless;