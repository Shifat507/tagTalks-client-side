import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgDetailsMore } from 'react-icons/cg';
import { FaTags, FaPenAlt } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoMdPhotos } from 'react-icons/io';
import usePost from '../../hooks/usePost';
import Membership from '../Membership';
import usePostCount from '../../hooks/usePostCount';
import axios from 'axios';
import { div } from 'framer-motion/client';
import { Typewriter } from 'react-simple-typewriter';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreatePost = () => {
    const { postCount } = usePostCount();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = usePost();

    const { user } = useContext(AuthContext);
    const authorName = user?.displayName;
    const email = user?.email;
    const authorImage = user?.photoURL;
    const upVote = 0;
    const downVote = 0;

    const [userBadge, setUserBadge] = useState('');

    const checkUserBadge = async () => {
        const badgeRes = await axiosPublic.get(`/user/${email}`)
        setUserBadge(badgeRes.data[0].userBadge);
    }
    checkUserBadge();
    // console.log(userBadge);

    // const [postCount, setPostCount] = useState(null); // Initial state set to null
    const [loading, setLoading] = useState(true); // Loading state to handle async data fetching

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    // Conditional logic based on post count
    if (postCount > 4 && userBadge === 'Bronze') {
        // console.log('Post korsy 5 ta ba tar beshi');
        Swal.fire({
            title: "Please Upgrade Your Plane",
            text: "Your post limit is exceeds. Get unlimited post limit for lifetime at only $59",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Become A Member"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/membership');
            } else {
                navigate('/');
            }
        });


    } else {
        // console.log('5 tar kom e korsy');

    }

    const onSubmit = async (formData) => {
        try {
            let imageUrl = null;
            if (formData.postImg[0]) {
                const imageData = new FormData();
                imageData.append('image', formData.postImg[0]);

                const response = await axiosPublic.post(image_hosting_api, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    imageUrl = response.data.data.display_url;
                }
            }

            const postData = {
                ...formData,
                authorName,
                email,
                authorImage,
                upVote,
                downVote,
                postImg: imageUrl || null,
            };

            const postResponse = await axiosPublic.post('/post', postData);
            if (postResponse.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your post has been uploaded successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
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
        <div className="">
            <div className="max-w-md mt-10 p-6 bg-gradient-to-t from-purple-100 to-blue-200 shadow-xl rounded-lg mx-auto ">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    <Typewriter
                        words={['Create A New Post']}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className='divider'></div>
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary w-full font-bold">
                            Upload Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
