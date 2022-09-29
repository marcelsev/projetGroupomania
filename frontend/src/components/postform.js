import React, { useState } from 'react';
import { timestampParser } from './utils';
import axios from 'axios';


const Postform = () => {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setVideo("");
        setFile(e.target.files[0]);
    }

    const handlePost = async (e) => {
        e.preventDefault();
let formdata = new FormData ();
const id = localStorage.getItem("id");

        await axios ({
            method: "POST",
            url: `http://localhost:3000/api/post/feed`,
            data: formdata,
            headers: { accessToken: localStorage.getItem("accessToken") }
        })
        .then ((res) => {
            window.location= `/feed/${id}`;
        });
    };

   

    
    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    };
    
    const handleVideo = () => {
        let findLink = message.split("");
        for (let i=0; i < findLink.length; i++){
            if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                let embed = findLink[i].replace('watch?v=' , "embed/");
                setVideo(embed.split('&')[0])
            }
        }
    }

    return (
        <div className='container-form-post'>
            <div className='post-form'>
                <textarea name='message' id='message' placeholder='Quoi de neuf?' onChange={(e) => setMessage(e.target.value)} value={message} />

                <div className='content-container'>

                <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                    <div className='footer-form'>
                        <>  <input type="file" id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                        </>
                        <br />
                        <span>{timestampParser(Date.now())}</span>
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