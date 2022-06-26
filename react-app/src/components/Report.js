import React from "react";

import { createNewReportByIdDoc, auth, getDetailsUserById, updateReportByIdDoc,getReportByIdDoc } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}



class Report extends React.Component {
    constructor(props) {
        super(props);
    
        this.nameBtn = "עדכון";
        if (this.props.params.method == "create")
            this.nameBtn = "הוספה"
        this.state = { createdBy: this.userId, content: "", created: "", sheft: "משמרת", createdFor: this.props.params.idHomeless };

        // if (this.props.report != null)
        //     this.state = { createdBy: this.userId, content: this.props.report.content, created: this.props.report.created, sheft: this.props.report.sheft, createdFor: this.props.id };

        this.isClicked = false;
        this.handleContent = this.handleContent.bind(this);
        this.handleSheft = this.handleSheft.bind(this);

    }

    handleSubmit = (event) => {
        this.isClicked = true;
        event.preventDefault();
        if (this.props.params.method == "create") {


            createNewReportByIdDoc(this.state).then(() => {
                alert('הפרטים עודכנו בהצלחה');

            }).catch(() => {
                alert('הפרטים לא עודכנו תנסה שוב');

            });
        } else {
            //  this.props.params.idHomeless == idDoc
            console.log(this.state)
            updateReportByIdDoc( this.props.params.idHomeless, this.state).then(() => {
                alert('הפרטים עודכנו בהצלחה');

            }).catch(() => {
                alert('הפרטים לא עודכנו תנסה שוב');

            });
        }
        history.back();


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
        if (this.props.params.method == "create") {
            var dateNow = new Date().toDateString();
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    this.userId = user.uid;

                    console.log("current user is: (Report.jsx file)")
                    this.state = { createdBy: this.userId, content: "", created: "", sheft: "משמרת", createdFor: this.props.params.idHomeless, fname: "" };

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

            await onAuthStateChanged(auth, async(user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    this.userId = user.uid;
                   
                    await getReportByIdDoc(this.props.params.idHomeless).then((reportJson)=>{
                 
                        // // this.state = {  fname: reportJson.fname,createdBy: this.userId, createdFor: this.props.params.idHomeles,content:reportJson.content, created: reportJson.created, sheft: reportJson.sheft };
                        this.setState({  ...this.state,createdFor:reportJson.createdFor,fname: reportJson.fname,createdBy: this.userId,content:reportJson.content, created: reportJson.created, sheft: reportJson.sheft });
    
                        console.log(this.state)
    
                    });//idDoc == idHomeless

                 
                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });
        }
    }



    //////////////////////////
    render() {

        const { created, fname, content, sheft } = this.state;

        return (
            <div className="d-flex justify-content-center my-5" dir="rtl" >
                <form onSubmit={this.handleSubmit} class="col-md-6" dir="rtl" >
                    <div class="d-flex justify-content-center"><h1>{this.nameBtn} דו"ח  לצעיר</h1></div>
                    <br></br>
                    <div class="row">
                        <div class="col-6 col-md-4" > {created}</div>

                        <div class="col-6 col-md-4">
                            <select  required class="form-select form-select-sm text-right" aria-label=".form-select-sm example" onChange={this.handleSheft} >
                               <option value={`${sheft}`}>{sheft}</option>
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
export default withParams(Report);