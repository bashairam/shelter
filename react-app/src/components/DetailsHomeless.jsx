import React from "react";
import "./User.css"
import { getDetailsHomelessesById, getDetailsHistoryById, updateDetailsUserById, auth,updateHomeless, } from "../firebase"
import "./DetailsHomeless.css";

class DetailsHomeless extends React.Component {

  constructor(props) {
    super(props);
    this.isClicked = true;
    
    // this.state = { name: "jkhdjh", age: "88",id:"756453" , personalPhone:"6756745" ,parentsAddress:"jerusalem",background :"nkkj",
    // referrer:"knkj",contact :"87867856",therapeutic_history:"cghdhg",criminalRecord:",.vnm,",
    // psycoticPast:"cnbvn",addiction_History:"hkfjgvhj",prominent_institutions:"ghgh",formFiller:",bmmnm"};

    this.state = {
      name: "", age: "",date:"", id: "", personalPhone: "",parentsAddress: "", background: "",
      referrer: "", contact: "", therapeutic_history: "", criminalRecord: "",
      psycoticPast: "", addiction_History: "", prominent_institutions: "", formFiller: "",stage:"בחר שלב",room:"בחר חדר",sleepingPlace:"" };

    // this.handleName = this.handleName.bind(this);
    // this.handleAge = this.handleAge.bind(this);
    // this.handlePersonalPhone = this.handlePersonalPhone.bind(this);
    // // this.handleparentsAddress = this.handleparentsAddress.bind(this);
    // // this.handleparentsAddress = this.handleparentsAddress.bind(this);

    // this.handleSubmit = this.handleSubmit.bind(this);
    

  }
  handleName=(event) =>{
    this.isClicked = false;
    this.setState({ name: event.target.value });

  }

  handleAge=(event) =>{
    this.isClicked = false;
    this.setState({ age: event.target.value });
  }
  handlePersonalPhone=(event) =>{
    this.isClicked = false;
    this.setState({ personalPhone: event.target.value });
  }
  handleparentsAddress=(event)=> {
    this.isClicked = false;
    this.setState({ parentsAddress: event.target.value });
  }
  handlebackground=(event) =>{
    this.isClicked = false;
    this.setState({ background: event.target.value });
  }
  handlereferrer = (event) =>{
    this.isClicked = false;
    this.setState({ referrer: event.target.value });
  }
  handlecontact =(event)=> {
    this.isClicked = false;
    this.setState({ contact: event.target.value });
  }
  handletherapeutic_history =(event) =>{
    this.isClicked = false;
    this.setState({ therapeutic_history: event.target.value });
  }
  handlecriminalRecord =(event) =>{
    this.isClicked = false;
    this.setState({ criminalRecord: event.target.value });
  }
  handlepsycoticPast =(event)=> {
    this.isClicked = false;
    this.setState({ psycoticPast: event.target.value });
  }
  handleaddiction_History =(event) =>{
    this.isClicked = false;
    this.setState({ addiction_History: event.target.value });
  }
  handleprominent_institutions =(event) =>{
    this.isClicked = false;
    this.setState({ prominent_institutions: event.target.value });
  }
  handleformFiller=(event) =>{
    this.isClicked = false;
    this.setState({ formFiller: event.target.value });
  }
  handlestage =(event) =>{
    this.isClicked = false;
    this.setState({ stage: event.target.value });
  }
  handleroom =(event)=> {
    this.isClicked = false;
    this.setState({ room: event.target.value });
  }
  handledate =(event)=> {
    this.isClicked = false;
    this.setState({ date: event.target.value });
  }
  handleid =(event)=> {
    this.isClicked = false;
    this.setState({ id: event.target.value });
  }

  handlesleepingPlace =(event)=> {
    this.isClicked = false;
    this.setState({ sleepingPlace: event.target.value });
  }

  
    handleSubmit =(event)=> {
      this.isClicked = true;
      
       updateHomeless(this.state).then(() => {
        alert('הפרטים עודכנו בהצלחה');
  
      }).catch(() => {
        alert('הפרטים לא עודכנו תנסה שוב');
  
      });
  
      event.preventDefault();
    }


componentDidMount(){
    
  getDetailsHomelessesById( this.state.id).then((data) => {
    this.setState(data);
    console.log(data);
  }).catch(() => {
    alert('יש בעיה בשליפת הנתונים תבדוק זמינות השרת');

  });
}




  render() {
    const { name, age,date ,id, personalPhone, parentsAddress, background, referrer, contact, therapeutic_history
      , criminalRecord, psycoticPast, addiction_History, prominent_institutions, formFiller,room,stage,sleepingPlace } = this.state;

    return (
      <div className="Add">
        <h1 className="text-center mt-5"> טופס עדכון פרטי צעיר </h1>
        <br /><br />
        <form onSubmit={this.handleSubmit}>

        <h6> תאריך ושעת הגעה</h6>
        <input
        type="datetime-local"
        style={{width : '100%'}}
        placeholder={date}
        onChange={this.handledate}

       />
  
      <br /><br />

          <h6>(כולל משפחה) שם</h6>
          <input
            type="text"
            style={{ width: '100%' }}
            placeholder={name}
            onChange={this.handleName}
          />
          <br /><br />

          <h6>גיל</h6>
          <input
            type="number"
            style={{ width: '100%' }}
            placeholder={age}
            onChange={this.handleAge}
         
          />
          <br /><br />

          <h6>ת"ז</h6>
          <input
            style={{ width: '100%' }}
            maxlength="9"
            placeholder={id}
            onChange={this.handleid}

          />
          <br /><br />

          <h6>טלפון</h6>
          <input
            style={{ width: '100%' }}
            type="number"
            maxlength="10"
            placeholder={personalPhone}
            onChange={this.handlePersonalPhone}


          />
          <br /><br />

          <h6>כתובת</h6>
          <input
            style={{ width: '100%' }}
            placeholder={parentsAddress}
            onChange={this.handleparentsAddress}

          />
          <br /><br />

          <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
          <textarea placeholder={background}  onChange={this.handlebackground} rows="5" >
          </textarea>
          <br /><br />

          <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
          <input
           placeholder={sleepingPlace}
            style={{ width: '100%' }}
             onChange={this.handlesleepingPlace}

          />
          <br /><br />

          <h6>גורם מפנה / פנייה עצמאית</h6>
          <input
            style={{ width: '100%' }}
            placeholder={referrer}
            onChange={this.handlereferrer}

          />
          <br /><br />

          <h6>(אם יש) טלפון איש קשר / גורם מלווה בקהילה</h6>
          <input
            style={{ width: '100%' }}
            maxlength="10"
            placeholder={contact}
            onChange={this.handlecontact}

          />
          <br /><br />

          <h6>היסטוריה טיפולית</h6>
          <textarea placeholder={therapeutic_history}   onChange={this.handletherapeutic_history} rows="5" >
          </textarea>
          <br /><br />

          <h6>(אם כן פרט) :האם יש עבר פלילי
          </h6>
          <textarea placeholder={criminalRecord}  onChange={this.handlecriminalRecord} rows="5" >
          </textarea>

          <br /><br />


          <h6> (אם כן פרט) :האם יש אבחנה או עבר פסיכוט

          </h6>
          <textarea placeholder={psycoticPast}   onChange={this.handlepsycoticPast} rows="5" >
          </textarea>
          <br /><br />

          <h6>      האם יש התמכרות פעילה או עבר של התמכרות  </h6>
          <textarea placeholder={addiction_History}  onChange={this.handleaddiction_History} rows="5" >
          </textarea>
          <br /><br />

          <h6> מוסדות בולטים בעבר</h6>
          <input
            style={{ width: '100%' }}
            placeholder={prominent_institutions}
            onChange={this.handleprominent_institutions}

          />
          <br /><br />        <br /><br />

          <h6> ?האם ברצונך להכניס את הצעיר לשלטר  <input
            type="checkbox" /></h6>
{/* defaultChecked={} */}
          <select
            style={{ width: '100%' }}
            onChange={this.handleroom}

          >
            <option value={null} >חדר {room} </option>
            <option value={1} >חדר 1</option>
            <option value={2} >חדר 2</option>
            <option value={3}>חדר 3 </option>
            <option value={4}>חדר 4</option>
            <option value={5} >חדר 5</option>
          </select>
          <br /><br />

          <select
            style={{ width: '100%' }}
            onChange={this.handlestage}

          >
            <option value=''>{stage}   </option>
            <option value="שלב קליטה">שלב קליטה</option>
            <option value="שלב א׳">שלב א׳</option>
            <option value="שלב ב׳">שלב ב׳</option>
            <option value="מסלול חיפוש עבודה">מסלול חיפוש עבודה</option>
            <option value="מסלול לילות">מסלול לילות</option>
          </select>

          <br /><br />

          <h6>ממלא הטופס</h6>
          <input
            placeholder={formFiller}
            onChange={this.handleformFiller}


          />

          <br /><br />
          <input style={{ backgroundColor: '#343741', borderColor: '#343741', color: '#ffff' }} className="btnSubmit" type="submit" value="עדכון" disabled={this.isClicked}/>  </form>
      </div>
    );
  }
}

export default DetailsHomeless;