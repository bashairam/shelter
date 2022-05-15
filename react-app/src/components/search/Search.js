import React, {Component} from "react";
 import {firestore ,auth} from "../../firebase"
 import "./Search.css"
// import 'firebase/compat/auth'
//import {Route, useHistory} from 'react-router-dom';
//import updateHomeless from "./updateHomeless";
//import NoLinkedUsers from "./NoLinkedUsers";
//import {Link} from "react-router-dom"




let nwalr;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            searchTerm: "",
            homelesses:[],
        }
        // this.usersRef = firestore.firestore().collection('homelesses');
        // this.uid = firestore.auth().currentUser.uid;
        // this.usersRef.doc(this.uid).get()
        //     .then((doc) => {
        //         this.setState({ id: doc.data().id });
               
        //     })
        //     .catch((e) => console.log(e.name));


    }
    // arrayContainsID(id,arr){
    //     for(let i=0;i<arr.length;i++)
    //     {
    //         if(arr[i].id === id)
    //             return true;
    //     }
    //     return false;
    // }
    // componentDidMount() {
    //     auth.onAuthStateChanged(user=> {
    //         console.log(user)
    //         if (!user) {
    //             window.location.href = "/"
    //             return
    //         }
    //         this.usersRef
    //             .get()
    //             .then(queryShot => {
    //                 queryShot.forEach(
    //                     (doc) => {
    //                         this.setState({homelesses: [...this.state.homelesses, doc.data()]})
    //                     }
    //                 )
    //             })
    //             .catch((e) => console.log(e.name));
    //     })
    // }





    // handleSubmit = async (event) => {
    //     event.preventDefault();
    //     let str='profile_pictures/';
    //     var list=this.state.homelesses
    
    //         var con = window.confirm("האם אתה בטוח שברצונך למחוק את המשתמשים?" )
    //         if (con){
    //             this.state.checkedList.forEach(elem =>
    //                 document.getElementById(elem).checked = false
    //             );
    //             for(let i =0;i<this.state.checkedList.length;i++)
    //             {

    //             list = this.removehomelesses(list,this.state.checkedList[i])

    //                let querySnapshot=await firestore.firestore().collection('Users').get()


    //                 querySnapshot.docs.forEach(doc => {
    //                     if(doc.data().id === this.state.checkedList[i])//search for the user that is on the checked list
    //                     {//then delete that user
                         
    //                         doc.ref.delete();
    //                         var desertRef = firestore.storage().ref(str+doc.id);
    //                         desertRef.delete().catch((e) => console.log(e.name))


    //                     }

    //                 })
    //                 let tmp = this.state.checkedList[i];
    //                 firestore.firestore().collection('Chats').get().then((querySnapshot) => {
    //                     querySnapshot.docs.forEach(doc => {
    //                       const newArr=doc.data().members.filter(member => member.id !== tmp);
    //                       doc.ref.update({members: newArr});

    //                     });
    //                 })

    //             }
    //             //empty the checked list

    //             this.setState({checkedList:[],homelesses:list})
    //         }
      



//     }

    render() {

        return (
            <div className="form-group">
                <br />

                <input
                    type="text"
                    className="ser-design"
                    placeholder="חיפוש"
                    value={this.state.searchTerm}
                    onChange={(e) => this.setState({ searchTerm: e.target.value })}
                    style={{ marginRight: "225px" ,display:"block" }}
                />

                <div className="table-t" >
                    <label
                        className="fLabels"
                        style={{ float: "right" }}
                        htmlFor="description"
                    >
                    </label>

                    <table className="table table-bordered">

                        <thead>
                        <tr>
                        <th>סטטוס</th>
                        <th>מסדות שהיה בהם בעבר</th>
                        <th>רקע התמכותי</th>
                        <th>רקע פסיכיאטרי</th>                            
                        <th>רקע פלילי</th>                
                        <th>עובד סוציאלי מלווה</th>                 
                        <th>עיר מגורים</th>                     
                        <th>גיל</th>                          
                        <th>ת.ז</th>                       
                        <th>שם</th>
                      
                        </tr>
                        </thead>

                        <tbody>

                        {this.renderTable()}
                        </tbody>

                    </table>
                </div>
              
            </div>
        );
    }
    renderTableData(person)
    {
        
            return(
                <tr><td>{person.fName +" "+ person.lName}</td><td>{person.id}</td><td>{person.email}</td><td>{person.type}</td>
                    <td className='buttDetails'><input className='detailsButt' value="הצג פרטים" type ='button' onClick={(event)=>this.getDetails(person)}/></td>
                    <td className='buttDetails'><input className='detailsButt' value="הצג דוח" type ='button' onClick={(event)=>this.getTable(person)}/></td>
                    <td person_id={person.id}><input type='checkbox' id = {person.id} className='homelesses_check' onChange={(event) =>{
                        if (event.target.checked === true) {
                            this.state.checkedList.push(person.id)
                            console.log(this.state.checkedList)
                        }
                        else {
                            this.state.checkedList.forEach((elmnt, index) => {if (elmnt === person.id) {
                                this.state.checkedList.splice(index,1);
                                console.log(this.state.checkedList)
                            }})
                        }

                    }}/></td></tr>
            )
       
    }
    renderTable() {
            return (this.state.homelesses
                .filter(person => person.fName.indexOf(this.state.searchTerm)>-1)
                .map((person) => (
                    this.renderTableData(person)
                )))
      
    }



}

export default Search;






// // //import { Firestore } from "firebase/firestore";
// // import React, { Component } from "react";
// // //import { Outlet } from "react-router-dom";
// // import "./Search.css"

// // import  {firestore} from "../../firebase";

// import React, { useState, useEffect } from "react";
// import { firestore } from "../../firebase";
// import "./Search.css";

// function Search() {
//   const [homeless, setHomeless] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [homelessData , setHomelessData] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await firestore.collection("homelesses").get();
//       setHomeless(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     setFilteredContacts(
//       homeless.filter(
//         (user) =>
//           user.name.toLowerCase().includes(search.toLowerCase()) ||
//           user.place.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search, homeless]);
//   return (
//     <>
//     <input type='text' onChange={(e)=> changeSearch(e.target.value)}> </input>
//       <div className="App">
//         <h1>Contact Details</h1>
//         <input
//           type="text"
//           placeholder="Search"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div>
//         {filteredContacts.map((contact) => [
//           <ol>
//             <b>Consumer Details :</b> {<br />}
//             {contact.name},{<br />}
//             {contact.placel},{<br />}
//             {contact.phone},{<br />}

//           </ol>,
//         ])}
//       </div>
//     </>
//   );
// }


// const changeSearch = (val) => {
//   setSearch(val)
//   if(val!=''){
//   setHomelessData(homeless.filter(contact => {
//       contact.name.includes(val) ||
//       contact.fname.includes(val)//same other fields added by following OR 
//       condition
//   }))
//   }
//   else{
//      setHomelessData(homeless)
//   }
// }
// export default Search;

// // function Search() {
     


// //   const [contacts, setContacts] = React.useState([]);

// //   React.useEffect(() => {
// //     const fetchData = async () => {
// //       const data = await db.collection("contacts").orderBy("createdDate").get();
// //       setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// //     };

// //     fetchData();
// //   }, []);
// //     //  state = {
// //     //    homeless: null
// //     //  }

// //     //  componentDidMount(){
// //     //    console.log('hi')
// //     //   //  db.collection('homelesses')
// //     //   //  .get()
// //     //   //  .then(snapshot => {
// //     //   //     console.log(snapshot)
// //     //   //  })
// //     //   //  .catch (
        
// //     //   //  )
// //     //  }
// //      render(){
// //         return (
// //         //   <div className="search">
// //         //   <div class="searchInputs">
// //         //     <input type="text" placeholder="...חיפוש" />
// //         //     <div className="searchIcon"></div>
// //         //   </div>
// //         //   <div className="dataResult"></div>
// //         // </div>


// //         <div className="form-group">
// //         <br />

// //         <input
// //             type="text"
// //             className="ser-design"
// //             placeholder="חיפוש"
// //             value={this.state.searchTerm}
// //             onChange={(e) => this.setState({ searchTerm: e.target.value })}
// //             style={{ marginRight: "225px" ,display:"block" }}
// //         />

// //         <div className="table-t" >
// //             <label
// //                 className="fLabels"
// //                 style={{ float: "right" }}
// //                 htmlFor="description"
// //             >
// //             </label>

// //             <table className="table table-bordered">

// //                 <thead>
// //                 <tr>
// //                 <th>סטטוס</th>
// //                             <th>שם</th>
// //                             <th>ת.ז</th>
// //                             <th>גיל</th>
// //                             <th>עיר מגורים</th>
// //                             <th>עובד סוציאלי מלווה</th>
// //                             <th>רקע פלילי</th>
// //                             <th>רקע פסיכיאטרי</th>
// //                             <th>רקע התמכותי</th>
// //                             <th>מסדות שהיה בהם בעבר</th>
                            
// //                 </tr>
// //                 </thead>

// //                 <tbody>

         
// //                 </tbody>

// //             </table>
// //         </div>
// //         <div className="button">
// //             <br />
// //             <button
// //                 className="button-de"
// //                 style={{ float: "right", marginRight: "780px" ,marginTop:"0px", color:"#dc3545"  }}
// //                 onClick={this.handleSubmit}
// //             >
               
// //             </button>
// //         </div>

// //     </div>


// //       )
// //  }
// // }

// // export default Search;