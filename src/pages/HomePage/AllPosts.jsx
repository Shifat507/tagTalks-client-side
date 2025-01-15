import React, { useEffect, useState } from 'react';
import Post from './Post';
import usePost from '../../hooks/usePost';

const AllPosts = () => {
    const [posts, loading] = usePost();
    // const [posts, setPosts] = useState([]);
    // useEffect(()=>{
    //     fetch('/posts.json')
    //     .then(res => res.json()) 
    //         .then(data => {
    //             setPosts(data); 
    //         })
    // },[])
    if(loading){
        return <span className="loading loading-spinner loading-md  mx-auto my-24"></span>;
    }
    // console.log(posts);
    return (
        <div>
            {
                posts.map((post, idx) => <Post key={idx} post={post}></Post>)
            }
        </div>
    );
};

export default AllPosts;