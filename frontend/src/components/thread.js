import React, { useEffect, useState } from "react";
import axios from 'axios';
import Post from './post';


function Thread() {
    const [posts, setPosts] = useState([]);
    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        if (isLoad) {
            axios.get('http://localhost:3000/api/post/feed')
                .then((res) => {
                    //console.log(res.data);
                    return setPosts(res.data);

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
                return (<div key={key}> <Post post={post} setIsLoad={setIsLoad} /></div>
                )
            })}
        </div>
    )
}


export default Thread;

