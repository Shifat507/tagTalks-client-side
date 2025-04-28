import React, { useState, useContext, useEffect } from 'react';
import { BiDownvote, BiSolidUpvote } from 'react-icons/bi';
import { FaRegCommentDots, FaShare } from 'react-icons/fa';
import { FacebookShareButton } from 'react-share'; // Import FacebookShareButton
import useAxiosPublic from '../../hooks/useAxiosPublic';
import usePost from '../../hooks/usePost';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Post = ({ post }) => {

    const navigate = useNavigate();

    const handleNavigateToDetails = () => {
        navigate(`/postDetails/${post._id}`, { state: { post } });
    };

    const { user } = useContext(AuthContext);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [localUpVote, setLocalUpVote] = useState(post.upVote);
    const [localDownVote, setLocalDownVote] = useState(post.downVote);
    const [comment, setComment] = useState('');
    const [commentCount, setCommentCount] = useState(0);
    const [modalTitle, setModalTitle] = useState('');

    const { authorImage, postTitle, postImg, tag, createdAt, postDescription, _id } = post;
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = usePost();

    const openModal = (id) => {
        setModalTitle(postTitle);
        document.getElementById(`modal_${id}`).showModal();
    };

    const handleUpvote = async () => {
        if (!user?.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please login for up-vote.",
            });
            return;
        }
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
        if (!user?.email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please login for down-vote.",
            });
            return;
        }
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

    const commentInfo = {
        postId: _id,
        comment,
        postTitle,
        email: user?.email,
    };

    const handleComment = async () => {
        if (!user?.email) {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please login to comment.",
            });
            return;
        }
        if (comment === '') {
            return;
        }

        const commentRes = await axiosPublic.post('/comments', commentInfo);
        // console.log(commentRes.data);
        setComment('');
    };

    const fetchCommentCount = async () => {
        try {
            const res = await axiosPublic.get(`/comments/count/${_id}`);
            setCommentCount(res.data.commentCount);
        } catch (error) {
            console.error('Error fetching comment count:', error.message);
        }
    };

    useEffect(() => {
        fetchCommentCount();
    }, []);
    fetchCommentCount();
    return (
        <div className=' bg-white shadow-lg rounded-lg p-6 mb-4 '>
            <div onClick={handleNavigateToDetails} className="hover:cursor-pointer pt-3">
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
                            className="w-full h-64 object-cover rounded-lg shadow-sm"
                        />
                    </div>
                )}
            </div>
            <div className='divider pt-2'></div>
            <div>
                {/* Interaction Section */}
                <div className="mt-4 flex items-center justify-around md:justify-between">
                    <div className="flex items-center gap-2 md:gap-4 ">
                        <button
                            onClick={handleUpvote}
                            disabled={isUpvoted}
                            className={`${isUpvoted ? 'btn-disabled' : 'btn-primary'} flex items-center gap-1 text-green-600 hover:bg-green-100 px-3 py-1 rounded-lg border border-gray-400`}
                        >
                            <span className="hidden sm:block">{localUpVote} Upvote</span>
                            <span className="sm:hidden">{localUpVote}</span>
                            <BiSolidUpvote size={20} />
                        </button>

                        <button
                            onClick={handleDownvote}
                            disabled={isDownvoted}
                            className={`${isDownvoted ? 'btn-disabled' : 'btn-primary'} flex items-center gap-1 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg border border-gray-400`}
                        >
                            <BiDownvote size={20} />
                            <span className="hidden sm:block">{localDownVote} Downvote</span>
                            <span className="sm:hidden">{localDownVote}</span>
                        </button>

                    </div>
                    {/* comment */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => openModal(_id)}
                            className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg border border-gray-400"
                        >
                            <FaRegCommentDots size={18} />
                            <span className="hidden sm:block">{commentCount} Comment</span>
                            <span className="sm:hidden">{commentCount}</span>
                        </button>
                        {/* Share Button */}
                        <div className='hover:text-blue-500'>
                            <FacebookShareButton
                                url={`https://tagtalks-a59ee.web.app/${_id}`} // Replace with your post URL
                                quote={postTitle}
                                className="flex items-center gap-1 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg"
                            >
                                <FaShare size={18} />
                                <span className='hidden lg:block'>Share</span>

                            </FacebookShareButton>
                        </div>
                    </div>
                </div>

                {/* Unique Modal -- Comment */}
                <dialog id={`modal_${_id}`} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="text-lg mb-3">
                            Your comment on- <br />
                            <span className="font-bold">{modalTitle}</span>
                        </h3>
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            className="textarea textarea-bordered w-full h-36"
                            placeholder="Type here ..."
                        ></textarea>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={handleComment} className="btn">
                                    Done
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Post;
