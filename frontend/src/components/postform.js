import React, { useEffect, useState } from 'react';

const Postform = () => {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setVideo('');
        setFile(e.target.files[0]);
    }

    const handlePost= ()=> {

    }
    const cancelPost = ()=>{
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    };

    return (
        <div className='container-form-post'>
            <div className='post-form'>
                <textarea name='message' id='message' placeholder='Quoi de neuf?' onChange={(e) => setMessage(e.target.value)} value={message} />

                <div className='footer-form'>
                    <div className='put-img'>
                        <>  <input type="file" id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                        </>
                    </div>
                    <div className='btn-send'>
                        <button className='cancel' onClick={cancelPost}>Annuler message</button>
                    <button className='send' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Postform; 