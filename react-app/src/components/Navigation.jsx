
import logo from './logo.png';
import { Link, NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';


function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
        <div className='ml-auto'>
            <ul className="navbar-nav">
              <li className="nav-item"> 
                  <NavDropdown title="איזור אישי" id="collasible-nav-dropdown">
                  <NavDropdown.Item className="text-end">
                  <Link  to="/user" >עדכון פרטים אישיים</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Link to="/login" > יציאה</Link>
                  </NavDropdown.Item>
                  </NavDropdown>
                </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/search">
                  כל הצעירים
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  הוספת צעיר
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/report">
                  הוספת דו''ח
                </NavLink>
              </li>              
             
            </ul>
          </div> 
          <div className='ms-auto'>

            <NavLink className="navbar-brand ms-auto" to="/">
            <img src={logo} height="70" width="200" alt="logo" /> 
            </NavLink>
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default Navigation;