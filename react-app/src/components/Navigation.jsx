
import logo from './logo.png';
import { NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';


function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
           <img src={logo} height="70" width="200" alt="logo" /> 
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/search">
                  חיפוש
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  הוספת צעיר
                </NavLink>
              </li>
              <li className="nav-item"> 
                <NavDropdown title="איזור אישי" id="collasible-nav-dropdown">
                <NavDropdown.Item class="text-end" href="#action/2.1"><NavLink to="/user">
                  עדכון פרטים אישיים
                </NavLink></NavDropdown.Item>
                <NavDropdown.Item href="#action/2.2"><NavLink to="/login">
                  יציאה
                </NavLink></NavDropdown.Item>
                </NavDropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;