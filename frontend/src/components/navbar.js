import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./logout";
import { UidContext } from "./AppContext";
import Logo from '../assets/iconlogo.png';
  
const Navbar = () => {
    const uid = useContext(UidContext);

    return (

        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to = "/feed">
                        <img src={Logo} alt="icon" />
                    </NavLink>
                </div>
                {uid ? (
                    <ul> 
                       
                    </ul>
                ) : (
                    <ul>
                         <li className="welcome">
                            <NavLink exact to = "/feed">
                            <h5>Bienvienue ''</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 