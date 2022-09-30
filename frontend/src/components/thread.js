import React, { useEffect, useState } from "react";
import axios from 'axios';
import Postform from "./postform";

function Thread (){
    const [posts , setPosts] = useState([]);
    const getPosts = ()=> {
        axios.get(`http://localhost:3000/api/feed`)
        .then ((res) => {
            return setPosts(res.data);
        })
        .catch ((err)=> {
            return console.log(err);
        });
    };

    useEffect(()=> {
        getPosts();
    }, []);

    const eventsList = posts.map((event,index)=> {
        <div key={index}>
            <Postform post={event} refreshPosts = {getPosts} />
        </div>
    });

    return (
        <div>
            <div>{eventsList} thread</div>
        </div>
    )
}


export default Thread;

