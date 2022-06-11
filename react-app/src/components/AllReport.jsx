import React from "react";
import "./AllReport.css"

import { getReportById, firestore } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { async } from "@firebase/util";
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
// import {useRef} from 'react';



class AllReport extends React.Component {

  constructor(props) {
    super(props);
    // this.ref = useRef(null);
    this.items = [];
    this.isClicked = true;
    this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor: this.props.id, idDoc: "" };
  }
  handlecreatedBy = (event) => {
    this.isClicked = false;
    this.setState({ createdBy: event.target.value });
  }
  handleContent = (event) => {
    this.isClicked = false;
    this.setState({ content: event.target.value });
  }
  handleCreated = (event) => {
    this.isClicked = false;
    this.setState({ created: event.target.value });
  }
  handleSheft = (event) => {
    this.isClicked = false;
    this.setState({ sheft: event.target.value });
  }
  handlecreatedFor = (event) => {
    this.isClicked = false;
    this.setState({ createdFor: event.target.value });
  }


  deleteReport = async (event, idDoc) => {

    event.preventDefault()
   
    await deleteDoc(doc(firestore, "reports", idDoc)).then((data) => {
      alert("הדו''ח נמחק בהצלחה")
      history.back();
      // window.location.reload(false);
      // navigate('./allreports'); 
    }).catch(() => {
      alert("מחיקת הדו''ח נכשלה")
    });


  }

  refreshData = async () => {
    await getReportById(this.state.createdFor).then((data) => {

      this.items = data.reverse();
      console.log(this.items)
      this.setState(this.items);

    }).catch(() => {
      alert('יש בעיה בשליפת הנתונים תבדוק זמינות השרת');

    });
  }
  async componentDidMount() {

    this.refreshData();
  }

  render() {
    const { created, fname } = this.state;

    return (
      <div dir="rtl" className="row height d-flex justify-content-center align-items-center my-30">
        <style></style>



        <form style={{
          justifyContent: "center",
          alignItems: "center"
        }}>

          <h2 class="centerTitle"> רשימת כל הדוחות </h2>
          <br></br>
          <table style={{
            width: '80%'
          }} class="table table-bordered center"  >
            <tr  >
              <th >תאריך</th>
              <th >שם המדריך</th>
              <th >משמרת</th>
              <th >תוכן הדוח</th>
              <th >עדכון</th>
              <th >מחיקה</th>
            </tr>
            {
              this.items.map((item,index) => (
                <tr key={item.id} id={index}>
                  <td
                    style={{
                      width: '10%'
                    }}
                  >{item.created}</td>
                  <td style={{ width: '10%' }}>{item.fname}</td>
                  <td style={{ width: '10%' }}  >{item.sheft}</td>
                  <td style={{ width: '50%' }}>
                    <textarea style={{ height: '15vh' }} multilinecolor={{ color: 'red' }} disabled type="text" class="form-control  text-right" id="exampleFormControlTextarea1" >{item.content}</textarea>
                  </td>
                  <td style={{ width: '5%' }} >

                    <Link to={"/report"} state={{ id: this.props.id, method: "update", report: item }} >
                      <button  > <i class="bi bi-pencil-square"></i>
                      </button>
                    </Link></td>

                  <td style={{ width: '5%' }}>

                    <button onClick={(event) => this.deleteReport(event, item.idDoc)}>  <i class="bi bi-trash"></i>
                    </button>


                  </td>

                </tr>
              ))
            }



          </table>

        </form>


      </div>
    );
  }
}

export default AllReport;

