import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Feed from '../pages/Feed';

const routes = ()=> {
    return (
        <Router>
            <Routes>
                <Route path = "/" exact element= {<Home/>} />
                <Route path = "/feed"  exact element= {<Feed/>} />
               
            </Routes>
        </Router> 
    );
};


export default routes;

