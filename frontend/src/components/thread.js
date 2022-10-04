import React, { useEffect, useState } from "react";
import axios from 'axios';
import { isEmpty } from "./utils";
import Postform from "./postform";


function Thread() {
    const [posts, setPosts] = useState([]);
    const getPosts = () => {
        axios.get('http://localhost:3000/api/post/feed')
            .then((res) => {
                return setPosts(res.data);

            })
            .catch((err) => {
                return console.log(err);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    console.log(posts)

    return (
        <div className="thread-container">
            <ul>
            {posts.map((post)=>{
                return (<div>{post._id}</div>)
            })}
            </ul>
        </div>
    )
}


export default Thread;

