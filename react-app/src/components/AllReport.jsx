import React from "react";
import "./AllReport.css"
import { getReportById, firestore } from "../firebase"
import { Link } from "react-router-dom";
import { doc, deleteDoc, Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}



class AllReport extends React.Component {

  constructor(props) {
    super(props);
    
    
    this.items = [];
    this.isClicked = true;
    this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor:this.props.params.idHomeless, idDoc: "" };
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
    if (window.confirm("? האם אתה בטוח שאתה רוצה למחוק ")) {
   await deleteDoc(doc(firestore, "reports", idDoc)).then((data) => {
      alert("הדו''ח נמחק בהצלחה")
     
    }).catch(()=>{
      alert("הדו''ח לא נמחק, תנסה שוב ")
    });
    
    }
    window.location.reload(false);
    navigate(`./allreports/${this.props.params.idHomeless}`); 

    // await deleteDoc(doc(firestore, "reports", idDoc)).then((data) => {
    //   alert("הדו''ח נמחק בהצלחה")
    //   // history.back();
    //   window.location.reload(false);
    //   navigate(`./allreports/${this.props.params.idHomeless}`); 
    // });

  }

  refreshData = async () => {

    await getReportById(this.props.params.idHomeless).then((data) => {

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
      <div dir="rtl" className="row height d-flex justify-content-center align-items-center my-5">
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

                    <Link to={`/report/update/${item.idDoc}`}  >
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

export default withParams(AllReport);

