import React from "react";
import "./User.css"
import { getDetailsUserById, updateDetailsUserById,auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";


class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.isClicked = true;
    
  
    this.state = { fname: "", email: "", phoneNumber: "" ,key:this.userId};

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleAddress = this.handleEmail.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


// aux. functions
  //  _validationName(str) {
  //   var hasNumber = /\d/;   
  //   if(hasNumber.test(str)) {
  //     return false;
  //   } 
  //   return true;
  // }
  //
  handleFirstName(event) {
    this.isClicked = false;
      this.setState({ fname: event.target.value });
   
  }
  // handleLastName(event) {
  //   this.isClicked = false;
  //   if(this._validationName( event.target.value )){
  //     this.setState({ lname: event.target.value });
  //   }else{
  //     this.error.errorFName = "שם משפחה לא נכון"
  //   }
  // }
  handleEmail(event) {
    this.isClicked = false;
    this.setState({ email: event.target.value });
  }
  handlePhoneNumber(event) {
    this.isClicked = false;
   
    this.setState({ phoneNumber: event.target.value });
  }

  handleSubmit(event) {
    this.isClicked = true;
    updateDetailsUserById(this.userId, this.state).then(() => {
      alert('הפרטים עודכנו בהצלחה');

    }).catch(() => {
      alert('הפרטים לא עודכנו תנסה שוב');

    });

    event.preventDefault();
  }

  async componentDidMount() {
   await onAuthStateChanged(auth, async(user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
     
         this.state = { fname: "", email:user.email, phoneNumber: "" ,key:this.userId};

        this.userId = user.uid;
        const userJson = await getDetailsUserById(user.uid);
        this.setState({key:this.userId, fname: userJson.fname, email: userJson.email, phoneNumber: userJson.phoneNumber });
        console.log(this.state)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
   

  }

  render() {
    const { fname, email, phoneNumber } =this.state;
    return (
      <div className="form-box">
        <form   onSubmit={this.handleSubmit} >
       
          <label >

            <input type="text" dir="rtl" placeholder={fname} onChange={this.handleFirstName} />
            <span> </span>
            :שם מלה
          </label>
          <label value="Ayy"></label>
          <label>
            <input type="text"  placeholder={email} onChange={this.handleEmail} />
            <span> </span>
            :מייל
          </label>
          <label>
            <input type="text" dir="rtl" placeholder={phoneNumber} onChange={this.handlePhoneNumber} />
            <span> </span>
            :נייד
          </label>
          <input style={{backgroundColor: '#343741', borderColor : '#343741', color : '#ffff' }}className="btnSubmit" type="submit" value="עדכון" disabled={this.isClicked} />
        </form>
      </div>
    );
  }
}

export default User;