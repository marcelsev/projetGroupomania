import React, { useEffect, useState } from "react";
import axios from 'axios';
import { dateParser } from "./utils";


function Post(props) {

    const { post, setIsLoad , userId ,admin } = props;
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [users, setUsers] = useState([]);
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/user')
            .then((res) => {
                //console.log(res.data)
                return setUsers(res.data);


            })
            .catch((err) => { return console.log(err) })
    }, []);


    const deleteQuote = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:3000/api/post/feed/' + post._id, {
            headers:
            {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            }
        })
            .then(() => {
                setIsLoad(true)
            })
            .catch((err) => { console.log(err) })
    }


    const updateItem = (message) => {
        const data = {
            message: textUpdate
        }
        if (textUpdate) {
            axios.put(`http://localhost:3000/api/post/feed/` + post._id,
                data,
                {
                    headers:
                    {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                    }
                },
                message
            )
                .then((res) => {
                    setIsUpdated(false);
                    setIsLoad(true);
                    //window.location= './feed'
                })
                .catch((error) => { console.log(error, 'error update') })
        }
    };


    const like = () => {
        if (liked === false) {
            setLiked(true)
        } else { }

    }
    const unlike = () => {
        if (liked !== false) {
            setLiked(false)
        } else { }
    }



    return <div className="card-post">
        {users.map((user, i) => (user._id === post.userId &&
            <div className="pseudo" key={i}>{user.pseudo}
            </div>))}
        <div className="container-contenu">
            <div className="message-post">{post.message}</div>
            <div className="photo-post-video">{post.image} {post.video}</div>
            {post.image && (
                <img src={post.image} alt="" className="card-pic" />
            )}
            {post.video && (
                <iframe
                    width="500"
                    height="300"
                    src={post.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={post._id}
                ></iframe>
            )}
        </div>
        <span>{dateParser(post.createdAt)}</span>


        <div className="container-settings">

            {isUpdated && (
                <div className="update-post">
                    <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                    <div className="btn-container">
                        <button className="btn" onClick={updateItem}>Valider modification</button>
                    </div>
                </div>
            )}

            {(userId === post.userId || admin)  && (

                <><button className="btn-modif" onClick={() => setIsUpdated(!isUpdated)}>
                    Modifier
                </button>
                <button className="btn-delete" onClick={(e) => {
                    if (window.confirm('vous voulez supprimer')) {
                        deleteQuote(e);
                    }
                }
                }>
                        Supprimer
                    </button></>

            )}

        </div>


        <div className="like">
            <div>{liked === false && (<i className="fa-regular fa-heart" onClick={like}></i>)}
                {liked === true && (<i className="fa-solid fa-heart" onClick={unlike}></i>)}</div>
        </div>
    </div>


}

export default Post; 