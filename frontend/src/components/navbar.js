import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./logout";
import { UidContext } from "./AppContext";
import Logo from '../assets/iconlog.png';



const pseudo = localStorage.getItem('pseudo');
const nom = pseudo.replace(/[ '"]+/g, ' ')
const Navbar = () => {
    const uid = useContext(UidContext);
    return (

        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact="/feed">
                        <img src={Logo} alt="icon" />
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                    </ul>
                ) : (
                    <ul>
                        <li className="welcome">
                            <h1>Bienvienue :  </h1><p>{nom} </p>
                        </li>
                        <Logout />
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 