import React from "react";
import "./AllReport.css"
import { getReportById } from "../firebase"
import { onAuthStateChanged } from "firebase/auth";



class AllReport extends React.Component {
  
  constructor(props) {
    super(props);
    this.items = [];
    this.isClicked = true;
    this.state = { createdBy: this.userId, content: "", created: "", sheft: "", createdFor: this.props.id };
    console.log("DetailsHomeLess File: "+ this.props.id)

    this.handleContent = this.handleContent.bind(this);
    this.handleSheft = this.handleSheft.bind(this);
    
  }
  handlecreatedBy=(event)=> {
    this.isClicked = false;
    this.setState({ createdBy: event.target.value });
}
handleContent=(event)=> {
    this.isClicked = false;
    this.setState({ content: event.target.value });
}
handleCreated=(event)=> {
    this.isClicked = false;
    this.setState({ created: event.target.value });
}
handleSheft =(event)=> {
    this.isClicked = false;
    this.setState({ sheft: event.target.value });
}
handlecreatedFor=(event)=> {
    this.isClicked = false;
    this.setState({ createdFor: event.target.value });
}

  async componentDidMount(){
  
   await getReportById( this.state.createdFor).then((data) => {
      this.setState(data);
      this.items =data.reverse();
      console.log(this.items);
    }).catch(() => {
      alert('יש בעיה בשליפת הנתונים תבדוק זמינות השרת');
  
    });
  }

  render() {
    const { created, fname } = this.state;

    return (
        <div   dir="rtl" className="row height d-flex justify-content-center align-items-center my-30">
          <style></style>

     

<form  style={{
          justifyContent: "center",
          alignItems: "center"
        }}>

<h2> רשימת כל הדוחות </h2>
<br></br>
<table  style={{  width : '80%'
          }}  class="table table-bordered center"  >
<tr  >
    <th >תאריך</th>
    <th >שם המדריך</th>
    <th >משמרת</th>
    <th >תוכן הדוח</th>
</tr>
{
     this.items.map((item) => (
        <tr key={item.id}>
            <td 
            style={{  width : '10%' }} 
            >{item.created}</td>
            <td style={{  width : '10%' }}>{item.fname}</td>
            <td  style={{  width : '10%' }}  >{item.sheft}</td>

            <td style={{  width : '60%' }}><textarea   disabled  type="text" class="form-control" id="example4" placeholder="100% width of the parent">{item.content}</textarea></td>
            
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

