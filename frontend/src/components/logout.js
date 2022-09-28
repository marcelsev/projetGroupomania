import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

const Logout = () => {
const removeCookie= (key) => {
    if (window !== "undefined"){
        cookie.remove(key, {expires: 1});
    }
};

    const logout = async () => {
       await axios({
        method: 'GET',
        url: `http://localhost:3000/api/user/logout`,

       })
       .then (( )=> removeCookie ('jwt'))
       .catch((err)=> console.log(err)) 

       window.location = '/';
    };

    return (
        
        <li onClick={logout} className= 'logout'>
            <h2> Déconnexion</h2>
        </li>

    );
};

export default Logout;
