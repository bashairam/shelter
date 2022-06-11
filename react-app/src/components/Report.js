import React from "react";

import { createNewReportByIdDoc, auth, getDetailsUserById, updateReportByIdDoc } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";



class Report extends React.Component {
    constructor(props) {
        super(props);
        console.log("Report page: id of homeless that we selected is " + this.props.report)
        console.log(this.props.method);
        this.nameBtn = "עדכון";
        if (this.props.method == "create")
            this.nameBtn = "הוספה"
        this.state = { createdBy: this.userId, content: "", created: "", sheft: "משמרת", createdFor: this.props.id };

        if (this.props.report != null)
            this.state = { createdBy: this.userId, content: this.props.report.content, created: this.props.report.created, sheft: this.props.report.sheft, createdFor: this.props.id };

        console.log(this.props.report);
        this.isClicked = false;
        this.handleContent = this.handleContent.bind(this);
        this.handleSheft = this.handleSheft.bind(this);

    }

    handleSubmit = (event) => {
        this.isClicked = true;
        event.preventDefault();
        if (this.props.method == "create") {


            createNewReportByIdDoc(this.state).then(() => {
                alert('הפרטים עודכנו בהצלחה');

            }).catch(() => {
                alert('הפרטים לא עודכנו תנסה שוב');

            });
        } else {
            updateReportByIdDoc(this.props.report.idDoc, this.state).then(() => {
                alert('הפרטים עודכנו בהצלחה');

            }).catch(() => {
                alert('הפרטים לא עודכנו תנסה שוב');

            });
        }

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
        if (this.props.method == "create") {


            var dateNow = new Date().toDateString();
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    this.userId = user.uid;

                    console.log("current user is: (Report.jsx file)")
                    this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor: this.props.id, fname: "" };

                    console.log(this.state)

                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });

            let userJson = await getDetailsUserById(this.userId);
            this.state = { ...this.state, fname: userJson.fname };



            this.setState({ ...this.state, created: dateNow });
        } else {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    this.userId = user.uid;

                    console.log("current user is: (Report.jsx file)")
                    this.state = { createdBy: this.userId, createdFor: this.props.id };

                    console.log(this.state)

                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });
            this.setState({ ...this.state, fname: this.props.report.fname });
        }
    }



    //////////////////////////
    render() {

        const { created, fname, content, sheft } = this.state;

        return (
            <div className="d-flex justify-content-center" dir="rtl" >
                <form onSubmit={this.handleSubmit} class="col-md-6" dir="rtl" >
                    <div class="d-flex justify-content-center"><h1>{this.nameBtn} דו"ח  לצעיר</h1></div>
                    <br></br>
                    <div class="row">
                        <div class="col-6 col-md-4" > {created}</div>

                        <div class="col-6 col-md-4">
                            <select class="form-select form-select-sm text-right" aria-label=".form-select-sm example" onChange={this.handleSheft} >
                                <option >{sheft} </option>
                                <option value="בוקר">בוקר</option>
                                <option value="ערב">ערב</option>

                            </select>
                        </div>
                        <div class="col-6 col-md-4" > {fname}</div>

                    </div>
                    <br></br>

                    <div >
                        <textarea class="form-control  text-right" id="exampleFormControlTextarea1" value={content} onChange={this.handleContent} rows="7">{content}</textarea>
                    </div>
                    <div class="col-md-6">
                        <br></br>
                        <input style={{ backgroundColor: '#343741', borderColor: '#343741', color: '#ffff' }} className="btnSubmit" type="submit" value={this.nameBtn} disabled={this.isClicked} />

                    </div>
                </form>
            </div>

        );
    }

}
export default Report;