import React, { useState, useEffect, useRef } from 'react'
import { storage } from "../firebase";
import { getDownloadURL,listAll, uploadBytes, ref, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { stringLength } from '@firebase/util';

export function InputData () { 
    const [data, setData] = useState([]);
    const dataa= [];
    
  let len
  useEffect(() => {
    const listRef = ref(storage, 'homelessDocuments/')
    listAll(listRef)
    .then((res) => {
      len = res.items.length
      res.items.forEach((itemRef) => {
        dataa.push(itemRef.name)
        setData(dataa)
        
      });

      if(data.length !== res.items.length){
        return <div> lo////</div>
      }
      
    }).catch((error) => {
      alert("בבקשה נסה שוב")
    });
    })
   
    const handleClickDel =(e) =>{
        const delRef = ref (storage , `/homelessDocuments/${e.target.id}`)
        deleteObject(delRef).then(() => {
            alert("הקובץ נמחק בהצלחה")
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });
    } 

    return (
        <div className='mt-5' >
        
           
 <ul>
 {data.map((user) => (
   <li>{user}</li>
 ))}
</ul>
         
                {/* // (data.length === len)  &&data.map((val) => (
                //                 <div className="text-end">              
                //                   ii
                //                  </div>
                //               ))
                //           }  */}
             
                
                  {/* <div>
    <ul>{data.map(name => <li key={name}> {name} </li>)}</ul>
  </div> */}
               </div>
              
      
    )
}

export default InputData;