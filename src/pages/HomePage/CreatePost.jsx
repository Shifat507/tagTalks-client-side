import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTags, FaPenAlt } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoMdPhotos } from 'react-icons/io';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

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
        try {
            // Image upload
            let imageUrl = null;
            if (formData.postImg[0]) {
                const imageData = new FormData();
                imageData.append('image', formData.postImg[0]);

                const res = await axiosPublic.post(image_hosting_api, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(res.data);

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                } 
            }

            // Create post data
            const postData = {
                ...formData,
                authorName,
                email,
                authorImage,
                upVote,
                downVote,
                postImg: imageUrl || null,
            };

            console.log(postData);

            // Send post data to API
            const postRes = await axiosPublic.post('/post', postData);
            if (postRes.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your post has been uploaded successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');
                reset();
            } else {
                throw new Error('Post creation failed');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
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
                    {errors.postTitle && (
                        <span className="text-red-500 text-sm mt-1">{errors.postTitle.message}</span>
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
                                message: 'Description must be at least 30 characters',
                            },
                        })}
                        placeholder="Write your post description here"
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.postDescription && (
                        <span className="text-red-500 text-sm mt-1">
                            {errors.postDescription.message}
                        </span>
                    )}
                </div>

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
                        <option value="politics">Politics</option>
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
                        {...register('postImg')}
                        type="file"
                        className="file-input w-full max-w-xs"
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary w-full">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
