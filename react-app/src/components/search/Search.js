import { collection, deleteDoc, getDocs, doc, setDoc} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { firestore } from "../../firebase"
import "./Search.css"
import 'react-toastify'
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useFetch from "../useFetch";
import Role from "../Role";


export function Search() {

  const navigate = useNavigate();
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore, "homelesses");
  const [checked, setChecked] = useState("");

  const { currentUser } = useAuth();
  const { isPending, data: users } = useFetch('users');
  const { inhmlsIsPending, data: inHmlsLists } = useFetch('inHomelesses');

  useEffect(() => {

    const getHomeless = async () => {
      const data = await getDocs(col)
      setHomeless(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getHomeless();
  }, []);

  const handleClickPsycotic = (e) => {
    setChecked("psycotic")
  }
  const handleClickCriminal = (e) => {
    setChecked("criminal")
  }
  const handleClickAddiction = (e) => {
    setChecked("addiction")
  }

  const handleDelete = async (id) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה למחוק את הצעיר ממערכת")) {
      const docRef = doc(firestore, "homelesses", id)
      const docRe = doc(firestore, "inHomelesses", id)
      const docR = doc(firestore, "history", id)
      await deleteDoc(docRef)
      await deleteDoc(docRe)
      await deleteDoc(docR)
      toast.success("הצעיר נמחק בהצלחה!");
    }
    window.location.reload(false);
    navigate('./search');
  }
  const handleClickAll = (e) => {
    window.location.reload();
  }


  const [newDate, setNewDate] = useState(0);

  
  const handleDe = async (id,name,age,parentsAddress,nameOf_prominent_institutions,psycoticPast,criminalRecord,
    addiction_History,background,contact,personalPhone,formFiller,referrer,sleepingPlace
    ) => {
    if (window.confirm("? האם אתה בטוח שאתה רוצה להוציא את הצעיר מהשלטר")) {
      const docRe = doc(firestore, "inHomelesses", id)
      await deleteDoc(docRe)
      await setDoc(doc(firestore, "homelesses", id), {
        exitDate: Date(newDate) ,
        name: name,
        age :age,
        parentsAddress:parentsAddress,   
        nameOf_prominent_institutions: nameOf_prominent_institutions,  
        psycoticPast: psycoticPast,
        criminalRecord: criminalRecord,
        addiction_History: addiction_History,
        background: background,
        contact: contact,
        personalPhone: personalPhone,
        formFiller: formFiller,
        referrer: referrer,
        sleepingPlace: sleepingPlace
      });
    }
    window.location.reload(false);
    navigate('./search');
  }

  return (
    <div className="row height d-flex justify-content-center align-items-center my-5">
      <div className="col-md-10">
        <div className="search">
          <i className="fa-fa-search"></i>
          <div className="ms-auto me-auto d-flex col-md-6">
            <DropdownButton
              id="dropdown1"
              variant="secondary"
              title="סנן לפי"
              className="dropdown dropleft"
              size="sm"
              

            >
              <Dropdown.Item  >
                <a onClick={handleClickPsycotic}>רקע פסיכיאטרי </a>

              </Dropdown.Item>
              <Dropdown.Item >
                <a onClick={handleClickCriminal}>רקע פלילי</a>
              </Dropdown.Item>

              <Dropdown.Item >
                <a onClick={handleClickAddiction}>רקע התמכרותי</a>
              </Dropdown.Item>

              <Dropdown.Item >
                <a onClick={handleClickAll}>כל הצעירים</a>
              </Dropdown.Item>

            </DropdownButton>

            <input
              type="text"
              className="form-control"
              placeholder="חפש לפי : שם / כתובת / גיל / ת.ז / מוסדות קודמות"
              onChange={(event) => {
                setSearch(event.target.value)
              }} />

          </div>
          <div className="form-group">
            <br />
            <div className="table-t" >
              <label
                className="fLabels"
                style={{ float: "right" }}
                htmlFor="description">
              </label>
            </div>

            <div style={{ textAlign: 'center' }}>
              <table className="table ">
                <thead>
                  <tr >
                    {currentUser &&
                      Role({ currentUser }, { users }, { isPending }, ['מנהל', 'רכז', 'עובד סוציאלי']) == true
                      &&
                      <div>


                        <th>הוצאה מהשלטר</th>
                        <th> מחיקה מהמערכת</th></div>}
                    <th>צפה בפרופיל</th>
                    <th>מסודות שהיה בהן בעבר</th>
                    <th>עיר מגורים</th>
                    <th>גיל</th>
                    <th>ת.ז</th>
                    <th className="namee">שם</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    homeless.filter((item) => {
                      const homelessName = item.name && item.name.includes(search)
                      const homelessAddress = item.parentsAddress && item.parentsAddress.includes(search)
                      const homelessAge = item.age && String(item.age).includes(search)
                      const homelessId = item.ID && String(item.ID).includes(search)
                      const homelessPastEstablishment = item.nameOf_prominent_institutions && item.nameOf_prominent_institutions.includes(search)
                     
                  
                      if (checked === "psycotic" && !item.psycoticPast) {
                        return false;
                      }
                      if (checked === "criminal" && !item.criminalRecord) {
                        return false;
                      }
                      if (checked === "addiction" && !item.addiction_History) {
                        return false;
                      }
                      else if (homelessName || homelessAddress || homelessAge || homelessId || homelessPastEstablishment) {
                        return item
                      }
                      if (search === "") {
                        return item
                      }
                    }).map(item =>
                      <tr key={item.id} >

                        {currentUser &&
                          Role({ currentUser }, { users }, { isPending }, ['מנהל', 'רכז', 'עובד סוציאלי']) == true
                          &&
                          <div>
                            <td>
                              {!inhmlsIsPending &&
                                inHmlsLists.find((inhml) => inhml.id === item.id)
                                &&
                                <button className="delete" onClick={() => handleDe(item.id,item.name,item.age,item.parentsAddress,item.nameOf_prominent_institutions,item.psycoticPast
                                ,item.criminalRecord,item.addiction_History,item.background,item.contact,item.personalPhone,item.formFiller,item.referrer,item.sleepingPlace
                                )}>
                                  להוציא</button>}
                            </td>

                            <td>
                              <button className="delete" onClick={() => handleDelete(item.id)}>
                                מחק</button></td>
                          </div>}


                        <td><button className="view" onClick={() => {
                          navigate(`/search/${item.id}`)
                        }}>
                          פרטים</button></td>
                        <td>{item.nameOf_prominent_institutions}</td>
                        <td>{item.parentsAddress}</td>
                        <td>{item.age}</td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>

                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Search;