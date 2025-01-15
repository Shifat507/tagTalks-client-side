import React, { useState, useContext } from 'react';
import { BiDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePost from '../../hooks/usePost';
import { AuthContext } from '../../providers/AuthProvider';

const Post = ({ post }) => {
    const { user } = useContext(AuthContext); // Access user email
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [localUpVote, setLocalUpVote] = useState(post.upVote);
    const [localDownVote, setLocalDownVote] = useState(post.downVote);

    const { authorImage, postTitle, postImg, tag, createdAt, postDescription, _id } = post;
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = usePost();

    const handleUpvote = async () => {
        if (!user?.email) return alert('Please log in to upvote.');
        try {
            const res = await axiosPublic.patch(`/post/${_id}/upvote`, {
                email: user.email,
            });
            if (res.data.modifiedCount) {
                setLocalUpVote((prev) => prev + 1);
                setIsUpvoted(true);
                refetch();
            }
        } catch (error) {
            console.error('Upvote error:', error.response?.data?.error || error.message);
        }
    };

    const handleDownvote = async () => {
        if (!user?.email) return alert('Please log in to downvote.');
        try {
            const res = await axiosPublic.patch(`/post/${_id}/downvote`, {
                email: user.email,
            });
            if (res.data.modifiedCount) {
                setLocalDownVote((prev) => prev + 1);
                setIsDownvoted(true);
                refetch();
            }
        } catch (error) {
            console.error('Downvote error:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {/* Header Section */}
            <div className="flex items-center gap-4">
                <div className="avatar">
                    <div className="w-12 h-12 rounded-full border-2 border-blue-500">
                        <img src={authorImage} alt="Author" />
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{postTitle}</h2>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{createdAt}</span>
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            #{tag}
                        </span>
                    </div>
                </div>
            </div>

            {/* Post Details */}
            {postDescription && (
                <p className="text-sm md:text-md mt-3">
                    {postDescription.length > 230
                        ? `${postDescription.substring(0, 230)}...`
                        : postDescription}
                </p>
            )}

            {/* Post Image Section */}
            {postImg && (
                <div className="mt-4">
                    <img
                        src={postImg}
                        alt="Post"
                        className="w-full h-auto rounded-lg shadow-sm"
                    />
                </div>
            )}

            {/* Interaction Section */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleUpvote}
                        disabled={isUpvoted}
                        className={`${
                            isUpvoted ? 'btn-disabled' : 'btn-primary'
                        } flex items-center gap-1 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg`}
                    >
                        <span>{localUpVote} Upvote</span>
                        <BiSolidUpvote size={20} />
                    </button>
                    <button
                        onClick={handleDownvote}
                        disabled={isDownvoted}
                        className={`${
                            isDownvoted ? 'btn-disabled' : 'btn-primary'
                        } flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg`}
                    >
                        <BiDownvote size={20} />
                        <span>{localDownVote} Downvote</span>
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg"
                    >
                        <FaRegCommentDots size={18} />
                        <span>Comment</span>
                    </button>
                    <button
                        className="flex items-center gap-1 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg"
                    >
                        <FaShare size={18} />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
