import React, { Component } from 'react';
import {firestore} from '../firebase';
import "./Add.css";


class Add extends Component {
 constructor(){
super()
this.state = {}
 }

 render() { 
   const AddItem = () =>{};
   
   const handleChange = event => {};

   const handleSubmit = (e) => {

   };

   return (
  <div className="Add">
    <p><h1 className="text-center mt-5"> טופס קליטת צעיר, היכרות ראשונית</h1></p>
    <div>
      <div>
        <div>
        </div>
        <div className="formAdd">
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <h6>   תאריך</h6>

                <input
                  type="date"
                  class="form-contro"
                  id="exampleFormControlInput1"
                />
            </div>
            <div className="form-group">
              <br />
              <h6> שעת הגעה </h6><input type="time" input="time" /> 
            </div>
            <br />
            <div>
              <h6>(כולל משפחה)שם </h6><input type="name" name="name" /> 
              <br /><br />
              <h6>גיל</h6> <input type="number" input="age" /> 
              <br /><br />
              <h6>ת"ז </h6><input type="text" class="ID" />
              <br /><br />
              <h6>טלפון</h6> <input type="text" class="num" />
              <br /><br />
              <h6>(.לפי משכתוב בת.ז) כתובת</h6><input type="text" class="address" />
              <br /><br />
              <h6> ?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
              <input type="text" class="txt" />
              <br /><br />
              <h6> ?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
              <input type="text" class="txt" />
              <br /><br />
              <h6> גורם מפנה / פנייה עצמאית</h6>
              <input type="text" class="txt" />
              <br /><br />
              <h6> (אם יש) איש קשר / גורם בקהילה</h6>
              <input type="text" class="txt" />
              <br /><br />
              <h6> היסטוריה טיפולית</h6>
              <input type="text" class="txt" />
              <br /><br />
            </div>
  
            <div className="d-grid">
        <button style={{backgroundColor: '#343741', borderColor : '#343741', alignContent :'center'}} type="submit" className="btn btn-primary">
          הוספה
        </button>
      </div>
            <div>
              <p><h1 className="text-center mt-5">שלטר המקום</h1></p>
              <div>
              <div class="form-group">
              <h6>   תאריך</h6>

                <input
                  type="date"
                  class="form-contro"
                  id="exampleFormControlInput1"
                />
            </div>
            <div class="form-group">
              <br />
              <h6> שעת הגעה </h6><input type="time" input="time" /> 
            </div>
            <br />
            <div>
              <h6>(כולל משפחה)שם </h6><input type="name" name="name" /> 
              <br /><br />
                <h6>טלפון ליצרת קשר</h6><input type="text" class="address" />
                <br /><br />
                <h6>(בבקשה לסמן על מה שנעשה) :בדיקת כל השלבי</h6>
</div>
                <table id = "Table">
        <tr>
          <th>שלב לדוגמא</th>
          <th></th>
          <th>V</th>
        </tr>
        <tr>
          <td>מילוי טופס קליטה עם הצעיר, מחוץ לשלטר. בבקשה למלא את הטופס במלואו, ובמידה ואין מה למלא</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td>לדאוג שהצעיר קורא את הנהלים וחותם עליהם</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td> תזכורת לצעיר שהקבלה היא ללילה ולמחרת תתקיים שיחה עם הצוות המוביל לגבי ההמשך</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td>דיווח לכונן טלפונית + שליחת הטופס</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td>חיפוש בכל מה שהצעיר הביא איתו ונעילת תרופות בחדר עו"ס-רכז במידת הצורך</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td>צילום ת.ז. במכונת צילום</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
        <tr>
          <td>ללוות את הצעיר לחדר ולראות שהוא מסדר את המצעים והמיטה</td>
          <td></td>
          <td><input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
          </td>
        </tr>
      </table>
      <br /><br />

                <h6> ?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
                <input type="text" class="txt" />
                <br /><br />
                <h6> ?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
                <input type="text" class="txt" />
                <br /><br />
                <h6> גורם מפנה / פנייה עצמאית</h6>
                <input type="text" class="txt" />
                <br /><br />
                <h6> (אם יש) איש קשר / גורם בקהילה</h6>
                <input type="text" class="txt" />
                <br /><br />
                <h6> היסטוריה טיפולית</h6>
                <input type="text" class="txt" />
                <br /><br />
              </div>
            </div>
          </form>
  
        </div>
      </div>
    </div>
  </div>
  ); } } export default Add;