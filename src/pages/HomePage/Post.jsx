import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { BiDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';

const Post = ({ post }) => {
    const { authorImage, postTitle, postImg, tag, createdAt, postDescription } = post;
    const { user } = useContext(AuthContext);

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
            {
                postDescription ? (
                    <p className='text-sm md:text-md mt-3'>
                        {postDescription.length > 230
                            ? `${postDescription.substring(0, 230)}...`
                            : postDescription
                        }
                    </p>
                ) : (
                    <p className='text-sm md:text-md mt-3 text-gray-500'>
                        No description available.
                    </p>
                )
            }

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
                        className="flex items-center gap-1 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg"
                    >
                        <BiSolidUpvote size={20} />
                        <span>Upvote</span>
                    </button>
                    <button
                        className="flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg"
                    >
                        <BiDownvote size={20} />
                        <span>Downvote</span>
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
