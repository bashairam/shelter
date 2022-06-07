import React from "react";

import { createNewReportByIdDoc, auth, getDetailsUserById } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";



class Report extends React.Component {
    constructor(props) {
        super(props);


        this.isClicked = false;
        this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor: "" };
        this.handleContent = this.handleContent.bind(this);
        this.handleSheft = this.handleSheft.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        // this.isClicked = true;
        event.preventDefault();
        console.log(this.state)
        createNewReportByIdDoc(this.state).then(() => {
            alert('הפרטים עודכנו בהצלחה');

        }).catch(() => {
            alert('הפרטים לא עודכנו תנסה שוב');

        });

    }

    handleContent(event) {
        this.isClicked = false;
        this.setState({ content: event.target.value });
    }
    handleSheft(event) {
        this.isClicked = false;
        this.setState({ sheft: event.target.value });
    }

    async componentDidMount() {
        var dateNow = new Date().toDateString();
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                this.userId = user.uid;

                console.log("current user is: (Report.jsx file)")
                this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor: "", fname: "" };

                console.log(this.state)

                // ...
            } else {
                // User is signed out
                // ...
            }
        });

        let userJson = await getDetailsUserById(this.userId);
        this.state = { ...this.state, fname: userJson.fname};



        this.setState({ ...this.state, created: dateNow });

    }



    //////////////////////////
    render() {

        const { created, fname } = this.state;

        return (
            <div className="d-flex justify-content-center" dir="rtl" >
                <form onSubmit={this.handleSubmit} class="col-md-6" dir="rtl" >
                    <div class="d-flex justify-content-center"><h1>הוספת דו"ח  לצעיר</h1></div>
                    <br></br>
                    <div class="row">
                        <div class="col-6 col-md-4" > {created}</div>

                        <div class="col-6 col-md-4">
                            <select class="form-select form-select-sm text-right" aria-label=".form-select-sm example" onChange={this.handleSheft} >
                                <option  >משמרת</option>
                                <option value="morning">בוקר</option>
                                <option value="afternoon">ערב</option>

                            </select>
                        </div>
                        <div class="col-6 col-md-4" > {fname}</div>

                    </div>
                    <br></br>

                    <div >
                        <textarea class="form-control  text-right" id="exampleFormControlTextarea1" placeholder="תוכן הדוח" onChange={this.handleContent} rows="7"></textarea>
                    </div>
                    <div class="col-md-6">
                        <br></br>
                        <input style={{ backgroundColor: '#343741', borderColor: '#343741', color: '#ffff' }} className="btnSubmit" type="submit" value="הוספה" disabled={this.isClicked} />

                    </div>
                </form>
            </div>

        );
    }

}
export default Report;