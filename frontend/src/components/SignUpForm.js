import React from "react";
import { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState ('');
    const [pseudo, setPseudo] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        const  emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const pseudoError = document.querySelector('.pseudo.error');

        axios ( {
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/`,
            withCredentials: true,
            data: {
                pseudo,
                email,
                password,
            },
        })
        .then ((res)=> {
            if (res.data.errors){
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML= res.data.errors.password;
                pseudoError.innerHTML= res.data.errors.pseudo;
            } else {
                window.location = '/feed';
            }
        })
        .catch ((err)=> {
            console.log (err);
        });
    };
    
    return (
     <><form action="" onSubmit={handleSignup} id="sign-up-form">
        <label htmlFor="pseudo">Pseudo</label>
        <br/>
        <input type="text" name="pseudo" id="pesudo" onChange={(e) => setPseudo (e.target.value)} value={pseudo} />
        <br/>
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={(e) => setEmail (e.target.value)} value={email} />
            <div className="email error" ></div>
            <br/>
            <label htmlFor="password">Mot de passe</label>
            <br/>
            <input type="password" name="password" id="password" onChange={(e) => setPassword (e.target.value)} value={password}/>
            <div className="password error"></div>
            <br/>
        <input type =" submit" value ="Se Connecter "/>
        </form></>
    );
};

export default  SignUpForm;
