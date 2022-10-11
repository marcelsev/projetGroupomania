import React, { useEffect, useState } from 'react';
import { timestampParser } from './utils';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Postform = () => {

    const [message, setMessage] = useState("");
    const [video, setVideo] = useState('');
    const [image, setImage] = useState("");
    //const navigate= useNavigate();   
    const pseudo = localStorage.getItem('pseudo')
    const nom = pseudo.replace(/[ '"]+/g, ' ')


    const handlePicture = (e) => {
        setImage(e.target.files[0]);
        setVideo("");
    }


    const handlePost = () => {
        if (message || image || video) {
            const getImage = image
            // console.log("Image is " + getImage)
            const data = new FormData()
            data.append("message", message)
            data.append("image", getImage);
            data.append("video", video)
            const option = {
                headers:
                {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                }
            };
            axios.post('http://localhost:3000/api/post/feed',
                data,
                option,
            )
                .then((res) => {
                    if (res.data) {
                        window.location = '/feed'
                        //return navigate('/feed')
                    }
                })
                .catch((error) => { console.log(error, 'error big') })
        } else {
            alert("mettre text ")
        }
    }


    const cancelPost = () => {
        setMessage('');
        setVideo('');
        setImage('');
    };



    useEffect(() => {

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes("https://www.yout") ||
                    findLink[i].includes("https://yout")
                ) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split("&")[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setImage('');
                }
            }
        };
        handleVideo();
    }, [message, video]);


    return (
        <div className='container-form-post'>
            <div className='post-form'>
                <div className='pseudo-poster'>{nom} :</div>
                <textarea
                    name='message'
                    id='message'
                    placeholder='Quoi de neuf?'
                    onChange={(e) => setMessage(e.target.value)} value={message} />
                <div className='content-container'>
                    {message || video || image ? (
                        <>
                            <div> <span>{timestampParser(Date.now())}</span></div>
                            <div className="content">
                                <p>{message}</p>
                                <img src={image} alt="" />
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
                        </>
                    ) : null}
                    <div className='footer-form'>
                        <>
                            <input type="file"
                                id='file-upload'
                                name='image'
                                accept='.jpg, .jpeg, .png'
                                onChange={(e) => handlePicture(e)} />
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