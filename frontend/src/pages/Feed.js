import React from 'react';
import Navbar from '../components/navbar';
import Postform from '../components/postform';
import Thread from '../components/thread';

const Feed = () => {
    return (
        <div className='feed-page'>
            <Navbar />
            <main>
                <div className='formulaire-newpost'>
                    <Postform />
                </div>
            </main>
            <section>
                <div className='fil-actualite'>
                    <Thread />
                </div>
            </section>
        </div>

    );
};


export default Feed;