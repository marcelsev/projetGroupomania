import React, { useEffect, useState } from "react";
import axios from 'axios';
import Post from './post';


function Thread() {
    const [posts, setPosts] = useState([]);

    // const option = {
    //     headers:
    //         { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) }
    // };





    const getPosts = () => {
        axios.get('http://localhost:3000/api/post/feed')
            .then((res) => {
                //console.log(res.data);
                return setPosts(res.data);

            })
            .catch((err) => {
                return console.log(err);
            });
    };

    useEffect(() => {
        getPosts();
       
    }, []);

    return (
        <div className="thread-container">
            {posts && posts.map((post, key) => {
                return (<div key= {key}> <Post post= {post} /></div>
                )
            })}

        </div>
    )
}


export default Thread;

