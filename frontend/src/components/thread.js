import React, { useEffect, useState } from "react";
import axios from 'axios';
import Post from './post';


function Thread() {
    const [posts, setPosts] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [userId, setUserId] = useState();
    const [admin, setAdmin] = useState();

    useEffect(() => {
        if (isLoad) {
            axios.get('http://localhost:3000/api/post/feed')
                .then((res) => {
                    //console.log(res.data);
                    setPosts(res.data);
                    setUserId(localStorage.getItem('id'))
                    setAdmin(localStorage.getItem('admin'))
                })
                .catch((err) => {
                    return console.log(err);
                });
            setIsLoad(false)
        }
    }, [isLoad]);


    return (
        <div className="thread-container">
            {posts && posts.map((post, key) => {
                return (<div key={key}> <Post post={post} setIsLoad={setIsLoad} userId={userId} admin={admin} /></div>
                )
            })}
        </div>
    )
}


export default Thread;

