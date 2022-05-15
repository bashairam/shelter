import firestore from '../firebase';
import { useState } from 'react';
  
const Read = () => {
  
    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        firestore.collection("homelesses").get().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var homeless = element.homelesses();
                setInfo(arr => [...arr , homeless]);
                  
            });
        })
    }
      
    // Display the result on the page
    return (
        <div>
            <center className="my-5">
            <h3>homeless Details</h3>
            </center>
          
        {
            info.map((homeless) => (
            <Frame course={homeless.ID} 
                   name={homeless.name} 
                   age={homeless.address}/>
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({course , name , age}) => {
    console.log(course + " " + name + " " + age);
    return (
        <center>
            <div className="div">
                  
            <p>NAME : </p>
            
                            
            <p>Age : </p>
            
                            
            <p>Course :</p>
   
            </div>
        </center>
    );
}
  
export default Read;