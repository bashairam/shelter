import React from "react";

function Add() {
  return (
    <div className="text-end">
    <div className="mx-auto" style={{width: '500px'}}>
      <div className="row align-items-center my-5">
          <h1 className="font-weight-light"> קליטת צעיר חדש-היכרות ראשונה</h1>
          <form >
       <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          className="form-control"
          placeholder="ת.ז"
        />
      </div>      
      <div className="mb-3">
        <input
        style={{textAlign: 'right'}}
          type="email"
          className="form-control"
          placeholder="שם פרטי"
        />
      </div>
      <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          className="form-control"
          placeholder="שם משפחה"
        />
      </div>
      <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          className="form-control"
          placeholder="מספר טלפון"
        />
      </div>
      <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          className="form-control"
          placeholder="גיל"
        />
      </div>
      <div className="mb-3">
        <input
         style={{textAlign: 'right'}}
          type="password"
          className="form-control"
          placeholder="כתובת"
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <label className="custom-control-label" htmlFor="customCheck1">
            קראתי את כללי ההתנהגות בשלטר יד חורוצים
          </label>
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
         </div>

        </div>
        <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <label className="custom-control-label" htmlFor="customCheck1">
            אני מודע לזה שמעבר על אחד מהכללים יכול להוות עילה להרחקתי
          </label>
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
        </div>
      </div>
      <div className="d-grid">
        <button style={{backgroundColor: '#343741', borderColor : '#343741' }} type="submit" className="btn btn-primary">
          כניסה
        </button>
      </div>
    </form>
      </div>
    </div>
  </div>
    
    

  );

}

export default Add;