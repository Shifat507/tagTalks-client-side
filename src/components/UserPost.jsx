import React from 'react';
import { FaCommentAlt, FaTrashAlt } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const UserPost = ({ post, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { _id, postTitle, upVote, downVote } = post;
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const deleteRes = await axiosPublic.delete(`/post/${_id}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                refetch();
            }
        });

        console.log(deleteRes);
        
    }
    return (
        <div className=" mx-auto my-4 ">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6 border border-gray-200">
                {/* Post Title */}
                <h2 className="text-xl font-semibold text-gray-800">{postTitle}</h2>

                {/* Votes */}
                <div className="flex justify-between items-center">
                    <p className="text-md font-medium text-green-600">
                        <span className="font-bold">{upVote}</span> Up-votes
                    </p>
                    <p className="text-md font-medium text-red-600">
                        <span className="font-bold">{downVote}</span> Down-votes
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        className="btn btn-sm btn-outline btn-info flex items-center gap-2"
                        aria-label="Add Comment"
                    >
                        <FaCommentAlt className="text-base" />
                        Comment
                    </button>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                        aria-label="Delete Post"
                    >
                        <FaTrashAlt className="text-base" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPost;
