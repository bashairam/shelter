// import React, { useState } from 'react';
import Read from './Read';
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane
// } from 'mdb-react-ui-kit';
import {Container,Row,Tab,Tabs} from 'react-bootstrap';
import './home.css'

function Home() {
  // const [activeKey, setActiveKey] = useState(1)
  
  return (
<<<<<<< HEAD
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Home</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
=======
    <div className="home ">
      <div className="container">
        <div className="row align-items-center my-5">
          <div>
            <Container className = "py-4">
              <Row className='justify-content-center'>
                <Tabs justify variant='pills' defaultActiveKey="tab-1" className='mb-1 p-0' >
                  <Tab eventKey="tab-1" title="חדרים">
                    <Read></Read>
                  </Tab>
                  <Tab eventKey="tab-2" title="שלבים" >
                    tab 2 content
                  </Tab> 
                </Tabs>
              </Row>  
            </Container>
>>>>>>> 86004ccd1e80b365c95a8790faf32f7eb4eb31ad
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;


