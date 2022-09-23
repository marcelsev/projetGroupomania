import React from 'react';
import Log from '../components/log';
import Logo from '../assets/icon-left-font.svg';
import Logo2 from '../assets/iconlogo.png';


const Home = () => {
  return (
    <div className="home-page">
      <div className='long-container'>
        <div className='logo-img'>
        <img src={Logo} alt='logo-simple' />
        </div>
        <div className='container-home-form'>
          <Log />
          <div className="img-container">
            <img src={Logo2} alt="img-log" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;