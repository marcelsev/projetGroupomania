module.exports.signUpErrors = (err) => {
 const errors = {pseudo: '', password:'', email:''  }
    if (err.message.includes('pseudo'))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (err.message.includes('email')) errors.email = "Email incorrect";
    console.log(errors.email)

    if (err.message.includes('password'))
    console.log(err.message)
    errors.password = "Le mot de passe incorrecte";
    if( err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo= "Ce pseudo est déjà pris";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email= "Cet email est déjà enregistré";

    return errors;
    

};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
  console.log(err.message)
    errors.email = "Paire login/mot de passe incorrecte";
  
  if (err.message.includes('password'))
  console.log(err.message)
    errors.password = "Paire login/mot de passe incorrecte"

  return errors;
}