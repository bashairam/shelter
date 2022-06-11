import React from "react";
import "./User.css"
import { getDetailsUserById, updateDetailsUserById,auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";

class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.isClicked = true;
    
  
    this.state = { fname: "", email: "", phoneNumber: "" ,key:this.userId,type:""};

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
     
         this.state = { fname: "", email:user.email, phoneNumber: "" ,type:"",key:this.userId}
        this.userId = user.uid;
        const userJson = await getDetailsUserById(user.uid);
        this.setState({key:this.userId, fname: userJson.fname, email: userJson.email, phoneNumber: userJson.phoneNumber ,type:userJson.type});
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
   

  }

  render() {
    const { fname, email, phoneNumber,type } =this.state;
    return (
      <div className="Add">
        <form   onSubmit={this.handleSubmit} >
       
            {/* <input type="text"  placeholder={email} onChange={this.handleEmail} /> */}
            <div className="col-6 col-md-4" > {email}</div>

            <span> </span>
        

          <h6>(כולל משפחה) שם</h6>
          <input
            type="text"
            style={{ width: '100%' }}
            value={fname}
            onChange={this.handleFirstName}
          />

          <label value="Ayy"></label>
          <h6>טלפון</h6>
          <input
            style={{ width: '100%' }}
            type="number"
            maxLength="10"
            value={phoneNumber}
            onChange={this.handlePhoneNumber}
          />


         
          {/* <label>
            <input type="text" dir="rtl" placeholder={phoneNumber} onChange={this.handlePhoneNumber} />
            <span> </span>
            :נייד
          </label> */}
          <div className="">
          <button type="submit" className="btn" disabled={this.isClicked}>
          עדכון
        </button>
          </div>
        </form>
      </div>
    );
  }
}

export default User;