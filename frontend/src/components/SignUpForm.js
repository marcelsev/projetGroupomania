import React from "react";
import { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const pseudoError = document.querySelector('.pseudo.error');
        const controlPasswordError = document.querySelector(".password-conf.error");
        const terms = document.getElementById('terms');
        const termsError = document.querySelector('.terms.error');
        
        controlPasswordError.innerHTML = "";
        termsError.innerHTML = "";
        
        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                controlPasswordError.innerHTML = "Les mots de passe ne correspondent pas";

            if (!terms.checked)
                termsError.innerHTML = "Veuillez valider les conditions générales.";

        } else {
            await axios({
                method: "POST",
                url: `http://localhost:3000/api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                        
                    } else {
                       alert('Bravo!, votre compte est enregistré :) ')
                        window.location.reload();
                        
                      
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <><form action="" onSubmit={handleSignup} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="email error" ></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <div className="password error"></div>
            <br/>
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br />
            <input type="password" name="password" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
            <div className="password-conf error"></div>
            <br />
            <input type="checkbox" id="terms" />
            <label htmlFor="terms"> J'accepte les <a href="/" target="_blank" rel="noopener">conditions générales</a> </label>
            <div className="terms error"></div>
            <br />
            <input type="submit" value="Valider inscription" />
        </form></>
    );
};

export default SignUpForm;
