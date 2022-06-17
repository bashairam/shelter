import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { firestore } from '../firebase';
import "./Add.css";
import { useNavigate } from 'react-router-dom';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import {createUser} from 'firebase/firestore';

function Add() {
  const [selectStatus, setselectStatus] = useState(true);// for last checkbox
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newDate, setNewDate] = useState(0);
  const [NewID, setNewID] = useState(0);
  const [NewTel, setNewTel] = useState("");
  const [NewContTel, setNewContTel] = useState("");
  const [NewAddr, setNewAddr] = useState("");
  const [NewWhy, setNewWhy] = useState("");
  const [newformFiller, setNewValue] = useState("")

  const [NewBack, setNewBack] = useState("");
  const [NewHis, setNewHis] = useState("");
  const [NewcriHis, setNewcriHis] = useState("");
  const [NewPsyHis, setNewPsyHis] = useState("");
  const [NewaddHis, setNewaddHis] = useState("");// addiction
  const [Newinstitutions, setNewinstitutions] = useState("");//institution
  const [NewHow, setNewHow] = useState("");
  // const [checked,setChecked]=useState(false);
  const [checkcri, setCheckedcru] = useState(true);
  const [checkpsy, setCheckedpsy] = useState(true);
  const [checkadd, setCheckedadd] = useState(true);
  const [checkback, setCheckedback] = useState(true);
  const [NewinstituY_N, setNewinstituY_N] = useState(true);//institution
  const [checktherap, setCheckedtherap] = useState(true);

  const [NewStage, setNewStage] = useState("");
  const [NewRoom, setNewRoom] = useState(0);

  //const usersCollectionRef = collection(firestore, "history");
  const navigate = useNavigate();




function handleChange(e) {
  const elements = document.getElementsByName("checkbox");
  const cri = document.getElementsByName("cri");
  const back = document.getElementsByName("back");
  const psy = document.getElementsByName("psy");
  const inst = document.getElementsByName("inst");
  const add = document.getElementsByName("add");

  let checkedCount = 0;
  let checkedCountcri = 0;
  let checkedCountback = 0;
  let checkedCountpsy = 0;
  let checkedCountadd = 0;
  let checkedCountinst = 0;

  elements.forEach((element) => {
    if (element.checked) {
      checkedCount++;
    }
  });
  cri.forEach((element) => {
    if (element.checked) {
      checkedCountcri++;
    }
  });  back.forEach((element) => {
    if (element.checked) {
      checkedCountback++;
    }
  });  psy.forEach((element) => {
    if (element.checked) {
      checkedCountpsy++;
    }
  }); inst.forEach((element) => {
    if (element.checked) {
      checkedCountinst++;
    }
  });  add.forEach((element) => {
    if (element.checked) {
      checkedCountadd++;
    }
  });
  if (checkedCount > 1 || checkedCount === 0) {
    setselectStatus(true);
  } else {
    setselectStatus(false);
  }
  if (checkedCountcri > 1 || checkedCountcri === 0) {
    setCheckedcru(true);
  } else {
    setCheckedcru(false);
  }if (checkedCountback > 1 || checkedCountback === 0) {
    setCheckedback(true);
  } else {
    setCheckedback(false);
  }if (checkedCountpsy > 1 || checkedCountpsy === 0) {
    setCheckedpsy(true);
  } else {
    setCheckedpsy(false);
  }if (checkedCountinst > 1 || checkedCountinst === 0) {
    setNewinstituY_N(true);
  } else {
    setNewinstituY_N(false);
  }if (checkedCountadd > 1 || checkedCountadd === 0) {
    setCheckedadd(true);
  } else {
    setCheckedadd(false);
  }
}

  function handleChange(e) {


    const elements = document.getElementsByName("checkbox");
    const cri = document.getElementsByName("cri");
    const back = document.getElementsByName("back");
    const psy = document.getElementsByName("psy");
    const inst = document.getElementsByName("inst");
    const add = document.getElementsByName("add");
    const therap = document.getElementsByName("therap");

    let checkedCount = 0;
    let checkedCountcri = 0;
    let checkedCountback = 0;
    let checkedCountpsy = 0;
    let checkedCountadd = 0;
    let checkedCountinst = 0;
    let checkedCounttherap = 0;

    elements.forEach((element) => {
      if (element.checked) {
        checkedCount++;
      }
    });
    cri.forEach((element) => {
      if (element.checked) {
        checkedCountcri++;
      }
    }); back.forEach((element) => {
      if (element.checked) {
        checkedCountback++;
      }
    }); psy.forEach((element) => {
      if (element.checked) {
        checkedCountpsy++;
      }
    }); inst.forEach((element) => {
      if (element.checked) {
        checkedCountinst++;
      }
    }); add.forEach((element) => {
      if (element.checked) {
        checkedCountadd++;
      }
    });therap.forEach((element) => {
      if (element.checked) {
        checkedCounttherap++;
      }
    });
    if (checkedCount > 1 || checkedCount === 0) {
      setselectStatus(true);
    } else {
      setselectStatus(false);
    }
    if (checkedCountcri > 1 || checkedCountcri === 0) {
      setCheckedcru(true);
    } else {
      setCheckedcru(false);
    } if (checkedCountback > 1 || checkedCountback === 0) {
      setCheckedback(true);
    } else {
      setCheckedback(false);
    } if (checkedCountpsy > 1 || checkedCountpsy === 0) {
      setCheckedpsy(true);
    } else {
      setCheckedpsy(false);
    } if (checkedCountinst > 1 || checkedCountinst === 0) {
      setNewinstituY_N(true);
    } else {
      setNewinstituY_N(false);
    } if (checkedCountadd > 1 || checkedCountadd === 0) {
      setCheckedadd(true);
    } else {
      setCheckedadd(false);
    }if (checkedCounttherap > 1 || checkedCounttherap === 0) {
      setCheckedtherap(true);
    } else {
      setCheckedtherap(false);
    }
  }

  const createUser = async () => {
    if (!newName || !NewID) {
      window.confirm("משהו השתבש ודא שהכנסת את השם ואת תעודת הזהות!")
    } else {
      await setDoc(doc(firestore, "homelesses", NewID), {
        exitDate: "" ,
        name: newName,
        age: Number(newAge),
        date: newDate,
        personalPhone: (NewTel),
        contact: (NewContTel),
        formFiller: newformFiller,
        parentsAddress: NewAddr,
        referrer: NewWhy,
        background: checkback,
        psycoticPast: checkpsy,
        addiction_History: checkadd,
        criminalRecord: checkcri,
        prominent_institutions: NewinstituY_N,
        sleepingPlace: NewHow,
        nameOf_prominent_institutions: Newinstitutions,
        therapeutic_history: checktherap
      });

      await setDoc(doc(firestore, "history", NewID), {
        background: NewBack,
        therapeutic_history: NewHis,
        psycoticPast: NewPsyHis,
        criminalRecord: NewcriHis,
        addiction_History: NewaddHis,
      });
      await setDoc(doc(firestore, "inHomelesses", NewID), {
        stage: NewStage,
        room: (NewRoom),
        date: newDate,
      });

      window.location.reload(false);
      navigate('./staff');
    }
  };

  return (
    <div className="Add my-5">
      <h1 className="text-center mt-5">טופס קליטת צעיר</h1>
      <br /><br />
      <form onSubmit={(e) => e.preventDefault()}>
        <h6> תאריך ושעת הגעה</h6>
        <input
          required
          type="datetime-local"
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewDate(event.target.value);
          }} />

        <br /><br />
        <h6>(כולל משפחה) שם</h6>
        <input
          type="text"
          required
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewName(event.target.value);
          }} />
        <br /><br />

        <h6>גיל</h6>
        <input
          type="number"
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewAge(event.target.value);
          }} />
        <br /><br />

        <h6>ת"ז</h6>
        <input
          required
          style={{ width: '100%' }}
          maxLength="9"
          onChange={(event) => {
            setNewID(event.target.value);
          }} />
        <br /><br />

        <h6>טלפון</h6>
        <input
          style={{ width: '100%' }}
          type="number"
          maxLength="10"
          onChange={(event) => {
            setNewTel(event.target.value);
          }} />
        <br /><br />

        <h6>כתובת</h6>
        <input
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewAddr(event.target.value);
          }} />
        <br /><br />

        <h6> ?רקע- מה הצעיר מספר על עצמו? מדוע הגיע לשלטר  <input
          name="back" type="checkbox" onChange={handleChange} />
        </h6>
        <textarea disabled={checkback}
          rows="5"
          onChange={(event) => {
            setNewBack(event.target.value);
          }}> </textarea>
        <br /><br />

        <h6>?(היכן ישן בימים האחרונים) מחוסר קורת גג</h6>
        <input
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewHow(event.target.value);
          }} />
        <br /><br />

        <h6>גורם מפנה / פנייה עצמאית</h6>
        <input
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewWhy(event.target.value);
          }} />
        <br /><br />

        <h6>(אם יש) טלפון איש קשר / גורם מלווה בקהילה</h6>
        <input
          style={{ width: '100%' }}
          maxLength="10"
          onChange={(event) => {
            setNewContTel(event.target.value);
          }} />
        <br /><br />

        <h6>היה לו/ה היסטוריה טיפולית? אם כן פרט<input
          name="therap" type="checkbox" onChange={handleChange} />

        </h6>
        <textarea rows="5"
          cols="70"
          disabled={checktherap}
          value={NewHis}
          onChange={(event) => {
            setNewHis(event.target.value);
          }}/>
        <br /><br />

        <h6>(אם כן פרט) :האם יש עבר פלילי    <input
          name="cri" type="checkbox" onChange={handleChange} />
        </h6>
        <textarea rows="5"
          cols="70"
          value={NewcriHis}
          disabled={checkcri}
          name="locationId"
          onChange={(event) => {
            setNewcriHis(event.target.value);
          }}/> 

        <br /><br />


        <h6> (אם כן פרט) :האם יש אבחנה או עבר פסיכוט  <input
          name="psy" type="checkbox" onChange={handleChange} />

        </h6>
        <textarea rows="5"
          cols="70"
          disabled={checkpsy}
          onChange={(event) => {
            setNewPsyHis(event.target.value);
          }}> </textarea>
        <br /><br />

        <h6>      האם יש התמכרות פעילה או עבר של התמכרות <input
          name="add" type="checkbox" onChange={handleChange} />

        </h6>
        <textarea rows="5"
          cols="70"
          disabled={checkadd}
          onChange={(event) => {
            setNewaddHis(event.target.value);
          }}> </textarea>
        <br /><br />

        <h6> מוסדות בולטים בעבר  <input
          name="inst" type="checkbox" onChange={handleChange} /></h6>
        <input
          disabled={NewinstituY_N}
          style={{ width: '100%' }}
          onChange={(event) => {
            setNewinstitutions(event.target.value);
          }} />
        <br /><br />        <br /><br />

        <h6> ?האם ברצונך להכניס את הצעיר לשלטר  <input
          name="checkbox" type="checkbox" onChange={handleChange} /></h6>

        <select disabled={selectStatus}
          style={{ width: '100%' }}
          type="number"
          onChange={(e) => setNewRoom(e.target.value)}>
          <option value="0">בחר חדר</option>
          <option value="1">חדר 1</option>
          <option value="2" >חדר 2</option>
          <option value="3" >חדר 3 </option>
          <option value="4">חדר 4</option>
          <option value="5" >חדר 5</option>
        </select>
        <br /><br />
        <select disabled={selectStatus} required
          style={{ width: '100%' }}
          onChange={(e) => setNewStage(e.target.value)}>
          <option value=''>בחר שלב</option>
          <option value="שלב קליטה">שלב קליטה</option>
          <option value="שלב א׳">שלב א׳</option>
          <option value="שלב ב׳">שלב ב׳</option>
          <option value="מסלול חיפוש עבודה">מסלול חיפוש עבודה</option>
          <option value="מסלול לילות">מסלול לילות</option>
        </select>
        <br /><br />

        <h6>ממלא הטופס</h6>
        <input
          onChange={(event) => {
            setNewValue(event.target.value);
          }} />
      </form>
      <button name='button' onClick={createUser}   >הוספת הצעיר</button>
    </div>
  );
}
export default Add;