import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

import goldenBadge from '../assets/badges/vip-goldenBadge.png'
import bronzeBadge from '../assets/badges/bronzeBadge.png'
import Post from './HomePage/Post';


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxiosPublic(); // Renamed to avoid conflict
    const [member, setMember] = useState(null);
    const [posts, setPosts] = useState([]);


    const recentPosts = async () => {
        try {
            const res = await axiosInstance.get(`/post/${user?.email}`);
            setPosts(res.data); 
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    }
    useEffect(() => {
        recentPosts();
    }, [user?.email, axiosInstance]);

    const checkMember = async () => {
        try {
            const res = await axiosInstance.get(`/user/${user?.email}`);
            setMember(res.data[0]?.userBadge); // Optional chaining to avoid errors
            console.log(res.data[0]?.userBadge);
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    };

    useEffect(() => {
        checkMember();
    }, [user, axiosInstance]);

    return (
        <div className='bg-base-200 h-screen'>
            <h2 className='text-4xl font-bold flex justify-center pt-5 pb-3'>My Profile</h2>
            <div className='flex justify-around border border-b-2'>
                <div className='flex justify-center'>
                    <div className='flex items-center gap-4'>
                        <div>
                            <div className="avatar online">
                                <div className="w-24 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-3xl font-semibold'>{user?.displayName}</h2>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    {
                        member === "Gold" ? <img className='w-48' src={goldenBadge} alt="" /> : <img className='w-36' src={bronzeBadge} alt="" />
                    }
                </div>
            </div>

            <div>
                <h2 className='font-semibold text-3xl ms-4 mb-5 text-center mt-5'>Recent Posts</h2>
            </div>

            {/* Render posts */}
            {posts.map((post, idx) => (
                <Post key={post._id || idx} post={post} />
            ))}
        </div>
    );
};

export default UserProfile;
