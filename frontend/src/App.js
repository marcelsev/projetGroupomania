import React from 'react';
import Routes from './components/routes';
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useEffect, useState } from 'react';


const App= () => {
  const [uid,setUid] = useState(null);
 
  useEffect(() =>{
    const fetchToken = async ()=> {
    await axios ({
      method: "GET",
      url: `http//:localhost:3000/jwtid`,
      withCredentials:true,
    })
    .then ((res) => {
      console.log(res); 
    setUid(res.data);
    })
    .catch((err) => console.log ("no Token"));
  };
  fetchToken();
}, [uid]);
  return (
    <UidContext.Provider value={uid} >
     
        <Routes /> 
      
    </UidContext.Provider>
  );
}

export default App;
