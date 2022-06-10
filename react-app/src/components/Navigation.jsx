import logo from './logo.png';
import { Link, NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import useAuth from "../hooks/useAuth";
import { auth } from '../firebase';
import { useNavigate} from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Navigation() {
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
      navigate("/login");

    } else {
      navigate("/login");
    }
  };
  const editDetails=()=>{
    navigate("/user");
  };

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width : '100%'}}>
        <div className="container" >
        <div className='ml-auto'>
            <ul className="navbar-nav" >
              <li className="nav-item"> 
                  <NavDropdown title="איזור אישי" id="collasible-nav-dropdown">
                 { currentUser && <NavDropdown.Item  className="text-end">
                   <button onClick={editDetails} style={{float:'right'}} >עדכון פרטים אישיים</button> 
                  </NavDropdown.Item>}
                  <NavDropdown.Item >
                    <button onClick={clickLogin}>
                      {currentUser ? "Log Out" : "Login"}
                    </button>
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
                {currentUser&&<NavLink className="nav-link" to="/staff">
                  צוות השלטר
                </NavLink>}
              </li>             
             
            </ul>
          </div> 

            <NavLink className="navbar-brand ms-auto" to="/">
            <img src={logo} height="70" width="200" alt="logo" /> 
            </NavLink>
          </div>
          
      </nav>
    </div>
  );
}

export default Navigation;