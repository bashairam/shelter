import React from "react";
// import "./User.css"
import { getDetailsHomelessesById, getDetailsHistoryById, updateDetailsUserById, auth,updateHomeless, } from "../firebase"
import "./DetailsHomeless.css";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


class DetailsHomeless extends React.Component {

  constructor(props) {
    super(props);
   
    this.isClicked = true;
    
    this.state = {
      name: "", age: "",date:"", id:this.props.params.idHomeless, personalPhone: "",parentsAddress: "", background: "",
      referrer: "", contact: "", therapeutic_history: "", criminalRecord: "",
      psycoticPast: "", addiction_History: "", prominent_institutions: "", formFiller: "",stage:"בחר שלב",room:"בחר חדר",sleepingPlace:""
      ,nameOf_prominent_institutions:"" };

    



  }
  
  handleChange=(event)=>{
    const elements = document.getElementsByName("checkbox");

    elements.forEach((element) => {
      if (element.checked) {
        checkedCount++;
      }
    });
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
    this.setState({ room: event.target.value.toString() });
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
      console.log("update")
      console.log(this.state)
       updateHomeless(this.state).then(() => {
        alert('הפרטים עודכנו בהצלחה');
  
      }).catch(() => {
        alert('הפרטים לא עודכנו תנסה שוב');
  
      });
  
      event.preventDefault();
    }


componentDidMount(){
    
  getDetailsHomelessesById( this.props.params.idHomeless).then((data) => {
    this.setState(data);
    console.log(data);
  }).catch(() => {
    alert('יש בעיה בשליפת הנתונים תבדוק זמינות השרת');

  });
}




  render() {
    const { name, age,date ,id, personalPhone, parentsAddress, background, referrer, contact, therapeutic_history
      , criminalRecord, psycoticPast, addiction_History, prominent_institutions, formFiller,room,stage,sleepingPlace,nameOf_prominent_institutions, } = this.state;

    return (
      <div className="Add">
        <h1 className="text-center mt-5"> טופס עדכון פרטי צעיר </h1>
        <br /><br />
        <form onSubmit={this.handleSubmit}>

        <h6> תאריך ושעת הגעה</h6>
        <input
        type="datetime-local"
        style={{width : '100%'}}
        value={date}
        onChange={this.handledate}

       />
  
      <br /><br />

          <h6>(כולל משפחה) שם</h6>
          <input
            type="text"
            style={{ width: '100%' }}
            value={name}
            onChange={this.handleName}
          />
          <br /><br />

          <h6>גיל</h6>
          <input
            type="number"
            style={{ width: '100%' }}
            value={age}
            onChange={this.handleAge}
         
          />
          <br /><br />

          <h6>ת"ז</h6>
          <input
            style={{ width: '100%' }}
            maxlength="9"
            value={id}
            //onChange={this.handleid}

          />
          <br /><br />

          <h6>טלפון</h6>
          <input
            style={{ width: '100%' }}
            type="number"
            maxlength="10"
            value={personalPhone}
            onChange={this.handlePersonalPhone}


          />
          <br /><br />

          <h6>כתובת</h6>
          <input
            style={{ width: '100%' }}
            value={parentsAddress}
            onChange={this.handleparentsAddress}

          />
          <br /><br />

          <h6>?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר</h6>
          <textarea value={background}  onChange={this.handlebackground} rows="5" >
          </textarea>
          <br /><br />

          <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
          <input
           value={sleepingPlace}
            style={{ width: '100%' }}
             onChange={this.handlesleepingPlace}

          />
          <br /><br />

          <h6>גורם מפנה / פנייה עצמאית</h6>
          <input
            style={{ width: '100%' }}
            value={referrer}
            onChange={this.handlereferrer}

          />
          <br /><br />

          <h6>(אם יש) טלפון איש קשר / גורם מלווה בקהילה</h6>
          <input
            style={{ width: '100%' }}
            maxlength="10"
            value={contact}
            onChange={this.handlecontact}

          />
          <br /><br />

          <h6>היסטוריה טיפולית</h6>
          <textarea value={therapeutic_history}   onChange={this.handletherapeutic_history} rows="5" >
          </textarea>
          <br /><br />

          <h6>(אם כן פרט) :האם יש עבר פלילי
          </h6>
          <textarea value={criminalRecord}  onChange={this.handlecriminalRecord} rows="5" >
          </textarea>

          <br /><br />


          <h6> (אם כן פרט) :האם יש אבחנה או עבר פסיכוט

          </h6>
          <textarea value={psycoticPast}   onChange={this.handlepsycoticPast} rows="5" >
          </textarea>
          <br /><br />

          <h6>      האם יש התמכרות פעילה או עבר של התמכרות  </h6>
          <textarea value={addiction_History}  onChange={this.handleaddiction_History} rows="5" >
          </textarea>
          <br /><br />

          <h6> מוסדות בולטים בעבר</h6>
          <input
            style={{ width: '100%' }}
            value={prominent_institutions}
            onChange={this.handleprominent_institutions}

          />
          <br /><br />    
             

        
        
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

          <h6> עדכון ע"י</h6>
          <input
            value={formFiller}
            onChange={this.handleformFiller}


          />

          <br /><br />
          <input style={{ backgroundColor: '#343741', borderColor: '#343741', color: '#ffff' }} className="btnSubmit" type="submit" value="עדכון" disabled={this.isClicked}/>  </form>
      </div>
    );
  }
}

export default withParams(DetailsHomeless);