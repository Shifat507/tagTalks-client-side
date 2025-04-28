import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

import goldenBadge from '../assets/badges/vip-goldenBadge.png';
import bronzeBadge from '../assets/badges/bronzeBadge.png';
import Post from './HomePage/Post';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic(); 
    const [member, setMember] = useState(null);
    const [posts, setPosts] = useState([]);

    const recentPosts = async () => {
        try {
            const res = await axiosPublic.get(`/recentPost/${user?.email}`);
            setPosts(res.data); 
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            recentPosts();
        }
    }, [user?.email, axiosPublic]);

    const checkMember = async () => {
        try {
            const res = await axiosPublic.get(`/user/${user?.email}`);
            setMember(res.data[0]?.userBadge); 
        } catch (error) {
            console.error("Error fetching member data:", error);
        }
    };

    useEffect(() => {
        if (user) {
            checkMember();
        }
    }, [user, axiosPublic]);

    return (
        <div className="bg-gray-100 min-h-screen py-10 px-5 md:px-20 w-9/12 ml-64">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">My Profile</h2>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Info */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="avatar online mb-4">
                        <div className="w-32 md:w-40 rounded-full shadow-lg">
                            <img src={user?.photoURL} alt="User Avatar" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                {/* Badge Section */}
                <div className="flex justify-center md:ml-auto">
                    {member === "Gold" ? (
                        <img className="w-48" src={goldenBadge} alt="Gold Member Badge" />
                    ) : (
                        <img className="w-36" src={bronzeBadge} alt="Bronze Member Badge" />
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
                <h2 className="text-3xl font-semibold text-gray-700 mb-6">Recent Posts</h2>

                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post, idx) => (
                            <Post key={post._id || idx} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No recent posts available.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
