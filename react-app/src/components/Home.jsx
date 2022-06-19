import Rooms from './Rooms';
import {Container,Row,Tab,Tabs} from 'react-bootstrap';
import './home.css'
import Stages from './Stages';

function Home() {
  
  
  return (
    <div className="home " >
      <div className="container">
        <div className="row align-items-center my-5">
          <div>
            <Container className = "py-4">
              <Row className='justify-content-center'>
                <Tabs justify variant='pills' defaultActiveKey="tab-1" className='mb-1 p-0' >
                  <Tab eventKey="tab-2" title="שלבים" >
                  <Stages></Stages>
                  </Tab> 
                  <Tab eventKey="tab-1" title="חדרים">
                    <Rooms></Rooms>
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


