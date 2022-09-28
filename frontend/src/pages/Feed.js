import React from 'react';
import Navbar from '../components/navbar';
import Postform from '../components/postform';


const Feed = ()=> {
return (
    <div className='feed-page'>
     <Navbar />    
     <main>
        <div className='formulaire-newpost'>
            <Postform />
        </div>
     </main>
    </div>
   
);
};


export default Feed;