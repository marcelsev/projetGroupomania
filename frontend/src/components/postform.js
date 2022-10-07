import React, { useEffect, useState } from 'react';
import { timestampParser } from './utils';
import axios from 'axios';


const Postform = () => {

    const [message, setMessage] = useState("");
    const [video, setVideo] = useState('');
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState('');
    //const [pseudo, setPseudo] = useState('');
console.log (file)


    const handlePicture = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setVideo("");
    }

    const handlePost = () => {
        if (message || file || video) {
            let formData = new FormData();
            console.log(formData)
            formData.append('file', file );
            const data = {
                message, 
                video, 
                formData
            }
            console.log(file);
            console.log(video);
            console.log(message);
            console.log(formData)
            const option = {
                headers:
                {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                    "Content-Type": "multipart/form-data"
                }
            };

            axios.post('http://localhost:3000/api/post/feed',
                data,
                option,
            )

                .then((res) => {
                    if (res.data) {

                        window.location = '/feed'
                    } else { }
                })
                .catch((error) => { console.log(error, 'error big') })
        } else {
            alert("mettre text ")
        }
    }


    const cancelPost = () => {
        setMessage('');
        setVideo('');
        setFile('');
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
                    setFile('');
                }
            }
        };
        handleVideo();
    }, [message, video]);

    return (
        <div className='container-form-post'>

            <div className='post-form'>
                <textarea name='message' id='message' placeholder='Quoi de neuf?' onChange={(e) => setMessage(e.target.value)} value={message} />
                <div className='content-container'>
                    <div className="content">
                        <p>{message}</p>
                        <img src={file} alt="" />
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