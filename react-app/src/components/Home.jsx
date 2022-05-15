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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;


