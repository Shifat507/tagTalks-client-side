import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAllPosts from '../hooks/useAllPosts';
import UserPost from '../components/userPost';

const MyPosts = () => {
    // const [posts, setPosts] = useState([]);

    const {user} = useContext(AuthContext);

    const [posts, ,refetch] = useAllPosts();
    console.log(posts);


    return (
        <div>
            <h1 className='text-4xl font-semibold my-2'>My Posts</h1>
            {
                posts.map(post => <UserPost refetch={refetch} key={post._id} post={post}></UserPost>)
            }
        </div>
    );
};

export default MyPosts;