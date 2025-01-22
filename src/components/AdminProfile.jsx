import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminProfile = ({ admin }) => {
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(0);
    const [comment, setComment] = useState(0);
    const [users, setUsers] = useState(0);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const adminData = async () => {

            const postRes = await axiosSecure.get(`/post/user/count/${user.email}`);
            setPost(postRes.data.count);

            const commentRes = await axiosSecure.get(`/comment/user/count/${user.email}`);
            setComment(commentRes.data.count);

            const userRes = await axiosSecure.get(`/user/count`);
            setUsers(userRes.data.count);

        };
        if (user?.email) { // Ensure that user email is available
            adminData();
        }
    }, [user?.email, axiosSecure]); // Only re-run if user email changes

    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto border border-gray-200">
            {/* Title */}
            <h1 className="text-3xl font-bold text-primary mb-4">Admin</h1>

            {/* Admin Image */}
            <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt={`${user?.displayName || "Admin"}'s avatar`}
                    />
                </div>
            </div>

            {/* Admin Info */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    {user?.displayName || "Admin Name"}
                </h2>
                <p className="text-gray-500">{user?.email || "admin@example.com"}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 w-full text-center">
                <div className="stat">
                    <span className="stat-title text-gray-500">Posts</span>
                    <span className="stat-value text-primary">{post || "0"}</span>
                </div>
                <div className="stat">
                    <span className="stat-title text-gray-500">Comments</span>
                    <span className="stat-value text-primary">{comment || "0"}</span>
                </div>
                <div className="stat">
                    <span className="stat-title text-gray-500">Users</span>
                    <span className="stat-value text-primary">{users || "0"}</span>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
