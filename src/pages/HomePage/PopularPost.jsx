import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Post from './Post';

const PopularPost = () => {
    const axiosPublic = useAxiosPublic();
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const fetchPopularPosts = async () => {

            const popularityRes = await axiosPublic.get('/popular-post');
            setPopular(popularityRes.data);

        };

        fetchPopularPosts();
    }, [axiosPublic]);


    // console.log(popular);



    return (
        <div>
            <div className='w-11/12 md:w-6/12 mx-auto'>
                {
                    popular && popular.map((post, idx) => <Post key={idx} post={post}></Post>)
                }
            </div>
        </div>
    );
};

export default PopularPost;