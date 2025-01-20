import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const PostDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state;
    const {
        authorImage,
        authorName,
        postTitle,
        postDescription,
        tag,
        createdAt,
        upVote,
        downVote,
        postImg,
    } = post;

    return (
        <div className="container mx-auto p-6">
            {/* Post Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800">{postTitle}</h1>
                <p className="text-gray-500 text-sm">
                    {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={authorImage}
                    alt="Author"
                    className="w-12 h-12 rounded-full shadow-md"
                />
                <div>
                    <p className="font-semibold text-lg">{authorName}</p>
                    <span className="badge badge-primary">{tag}</span>
                </div>
            </div>

            {/* Post Image */}
            {postImg && (
                <div className="mb-6">
                    <img
                        src={postImg}
                        alt={postTitle}
                        className="rounded-lg shadow-lg max-h-96 w-full object-cover"
                    />
                </div>
            )}

            {/* Post Description */}
            <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                    {postDescription}
                </p>
            </div>

            {/* Vote Section */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <FaArrowUp className="text-green-500" />
                    <span className="font-bold text-lg">{upVote}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaArrowDown className="text-red-500" />
                    <span className="font-bold text-lg">{downVote}</span>
                </div>
            </div>
            {/* Back to Home Button */}
            <div className="mt-6">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PostDetails;
