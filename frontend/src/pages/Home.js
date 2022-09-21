import React from 'react';
import Log from '../components/log';
import Logo from '../assets/icon-left-font.svg';

const Home = ()=> {
return (
    <div className="home-page">
      <div className='long-container'>
    <Log />
    <div className="img_container">
            <img src={Logo}  alt="img-log"/>
      </div>
    </div>
    </div>
);
};


export default Home;