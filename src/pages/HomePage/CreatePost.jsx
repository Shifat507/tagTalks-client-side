import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTags, FaPenAlt } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoMdPhotos } from 'react-icons/io';


const CreatePost = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { user } = useContext(AuthContext);
    const authorName = user?.displayName;
    const email = user?.email;
    const authorImage = user?.photoURL;
    const upVote = 0;
    const downVote = 0;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (formData) => {
        const postData = {
            ...formData,
            authorName,
            email,
            authorImage,
            upVote,
            downVote,
            postImg: formData.postImg?.[0] || null
        };

        const res = await axiosPublic.post('/post', postData)
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your post has been uploaded successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        }
        console.log('Post Created:', postData);
        reset();
    };



    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Create a New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Post Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center">
                            <FaPenAlt className="mr-2" /> Post Title
                        </span>
                    </label>
                    <input
                        type="text"
                        {...register('postTitle', { required: 'Post title is required' })}
                        placeholder="Enter your post title"
                        className="input input-bordered w-full"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
                    )}
                </div>

                {/* Post Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium flex items-center">
                            <CgDetailsMore className="mr-2" /> Post Description
                        </span>
                    </label>
                    <textarea
                        {...register('postDescription', {
                            required: 'Post description is required',
                            minLength: {
                                value: 30,
                                message: 'Description must be at least 20 characters',
                            },
                        })}
                        placeholder="Write your post description here"
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.description && (
                        <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
                    )}
                </div>

                <div className='flex items-center justify-between gap-4'>
                    {/* Tags */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium flex items-center">
                                <FaTags className="mr-2" /> Tags
                            </span>
                        </label>
                        <select
                            {...register('tag', { required: 'Please select a tag' })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select a tag</option>
                            <option value="technology">Technology</option>
                            <option value="science">Science</option>
                            <option value="education">Education</option>
                            <option value="sports">Sports</option>
                            <option value="politic">Politics</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="health">Health</option>
                        </select>
                        {errors.tag && (
                            <span className="text-red-500 text-sm mt-1">{errors.tag.message}</span>
                        )}
                    </div>
                    {/* Photo */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium flex items-center">
                                <IoMdPhotos className="mr-2" /> Choose Photo
                            </span>
                        </label>
                        <input
                            {...register("postImg")}
                            type="file"
                            className="file-input w-32 max-w-xs"
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary w-full">Create Post</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
