import React, { useEffect, useState } from "react";
import axios from 'axios';
//import Card from './card-post';



function Thread() {
    const [posts, setPosts] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [users, setUsers] = useState(' ');

    const option = {
        headers:
            { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    };


    const getPosts = () => {
        axios.get('http://localhost:3000/api/post/feed')
            .then((res) => {
                return setPosts(res.data)

            })
            .catch((err) => {
                return console.log(err);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);
    // console.log(posts)

    const updateItem = (message) => {
        axios.put('http://localhost:3000/api/post/feed',
            message
        )
            .then((res) => {
                if (res.data) {
                    window.location = '/feed'
                } else { }
            })
            .catch((error) => { console.log(error, 'error update') })
    }

    const deleteQuote = () => {

    }

    return (
        <div className="thread-container">
            <ul>
                {posts.map((post) => {
                    return (
                        <div className="card-post">
                            <div className="pseudo">
                            </div>
                            <div className="message-post">{post.message}</div>
                            <div className="photo-post-video">{post.file} {post.video}</div>
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
                            <div className="container-settings">
                                <div className="card-update">
                                    <div> {isUpdated === false && <p>{post.message}</p>}
                                        {isUpdated && (
                                            <div className="update-post">
                                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                                                <div className="btn-container">
                                                    <button className="btn" onClick={updateItem}>Valider modification</button>
                                                </div>
                                            </div>
                                        )}
                                        {//users._id === post.userId &&
                                            (<button className="btn-modif" onClick={() => setIsUpdated(!isUpdated)}>
                                                Modifiquer
                                            </button>
                                            )}
                                    </div>
                                </div>
                                <div className="delete-container">
                                    <button className="btn-delete" onClick={() => {
                                        if (window.confirm('vous voulez supprimer')) {
                                            deleteQuote();
                                        }
                                    }}>Supprimer</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}


export default Thread;

