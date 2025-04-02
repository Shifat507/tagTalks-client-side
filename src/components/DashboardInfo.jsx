import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import postIcon from '../assets/icons/post-Icon.png';
import commentIcon from '../assets/icons/comments-icon.png' 

const DashboardInfo = () => {
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(0);
    const [comment, setComment] = useState(0);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const adminData = async () => {

            const postRes = await axiosSecure.get(`/post/user/count/${user.email}`);
            setPost(postRes.data.count);

            const commentRes = await axiosSecure.get(`/comment/user/count/${user.email}`);
            setComment(commentRes.data.count);

        };
        if (user?.email) { // Ensure that user email is available
            adminData();
        }
    }, [user?.email, axiosSecure]); // Only re-run if user email changes
    return (
        <div>
            <div className="md:ml-64">
                <header className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
                    {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Create Post
                    </button> */}
                </header>

                {/* User Profile */}
                <section className="mb-10">
                    <div className="bg-white p-6 rounded-md shadow-md ">
                        <div className="flex items-center">
                            <img
                                src={user?.photoURL}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">{user?.displayName}</h3>
                                <p className="text-gray-500 hidden md:block">{user?.email}</p>
                                <div className="flex flex-col md:flex-row space-x-4 mt-2 text-sm">
                                    {/* <span>Posts: <strong>{post}</strong></span>
                                    <span>Comments: <strong>{comment}</strong></span> */}
                                    <span>Followers: <strong>300</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Posts & Comments */}
                <section className='flex justify-evenly items-center mb-10'>
                    <div className="card bg-green-200 w-96">
                        <div className="card-body">
                            <h2 className="card-title"><span>
                            <img src={postIcon} alt="" />
                            </span>Posts</h2>
                            <span className='font-bold'>Total Posts: {post}</span>
                        </div>
                    </div>
                    <div className="card bg-yellow-100 w-96">
                        <div className="card-body">
                            <h2 className="card-title"><span>
                            <img src={commentIcon} alt="" />
                            </span>Comments</h2>
                            <span className='font-bold'>Total Comments: {comment}</span>
                        </div>
                    </div>
                </section>

                {/* Activity Feed */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                    <div className="bg-white p-4 rounded-md shadow-md space-y-4">
                        <div className="p-4 border-b">
                            <h4 className="font-semibold">How to improve coding skills?</h4>
                            <p className="text-gray-500 text-sm">
                                Posted in <strong>#Coding</strong> - 2 hours ago
                            </p>
                        </div>
                        <div className="p-4 border-b">
                            <h4 className="font-semibold">React vs Angular: Which is better?</h4>
                            <p className="text-gray-500 text-sm">
                                Posted in <strong>#Frontend</strong> - 1 day ago
                            </p>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold">How to stay consistent in learning?</h4>
                            <p className="text-gray-500 text-sm">
                                Posted in <strong>#Motivation</strong> - 3 days ago
                            </p>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default DashboardInfo;