import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { firestore } from "../../firebase"
import "./Search.css"



export function Search() {
  const navigate = useNavigate();
  const [homeless, setHomeless] = useState([]);
  const [search, setSearch] = useState("");
  const col = collection(firestore, "homelesses");
  const [checked, setChecked] = useState("");
  
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

  const handleClickAll = (e) => {
    window.location.reload();
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
              menuVariant="light"
              title="סנן לפי"
              className="dropdown dropleft"
              size ="sm"
              border = '#f30bcc'

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
              placeholder="חיפוש"
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
                    <th></th>
                    <th>מסודות שהיה בהן בעבר</th>
                    <th>עיר מגורים</th>
                    <th>גיל</th>
                    <th>ת.ז</th>
                    <th>שם</th>

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
                

                      if (checked ==="psycotic" && !item.psycoticPast) {
                        return false;
                      }
                      if (checked=== "criminal" && !item.criminalRecord) {
                        return false;
                      }
                      if (checked=== "addiction" && !item.addiction_History) {
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