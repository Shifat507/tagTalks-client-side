import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
// import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FcGoogle } from 'react-icons/fc';
import usePostCount from '../hooks/usePostCount';
import { FaFacebook } from 'react-icons/fa';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { postCount } = usePostCount();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, userUpdateData, googleSignIn, facebookSignIn , loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
        googleSignIn()
            .then(res => {
                // console.log(res);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    userBadge: 'Bronze',
                    postCount

                }
                //send user data to DB
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/');
                    });
                // console.log(res.user);
                navigate('/')
            })

    }

    const handleFacebookSignin = () => {
        facebookSignIn()
            .then(res => {
                // console.log(res);
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    userBadge: 'Bronze'

                }
                //send user data to DB
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        navigate('/');
                    });
                // console.log(res.user);
                navigate('/')
            })
    }

    const onSubmit = (data) => {
        const { email, password, name, photoURL } = data;
        createUser(email, password)
            .then(res => {
                // console.log(res.user);
                userUpdateData(name, photoURL)
                    .then(res => {
                        // create user entry in DB
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            userBadge: 'Bronze',
                            postCount

                        }
                        //send user data to DB
                        axiosPublic.post('/users', userInfo)
                        navigate('/');
                    })
                    .catch(err => {
                        // console.log('Error: ', err);
                    })
            })

            .catch(error => {

                // console.error(error);
                alert("Error: ", error.message);
            });

    };

    return (
        <>
            {/* <Helmet>
                <title>TagTalks | Register</title>
            </Helmet> */}
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse md:w-10/12 mx-auto">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">Signup now!</h1>
                        <p className="py-6">
                            Create an account to connect with others, share your insights, and dive into meaningful discussions. Be part of a vibrant community where your voice matters!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="url" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className='text-red-600'>Photo URL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                                })} placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password field is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be at least 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must include uppercase, lowercase, and special characters</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Sign Up" className="btn btn-primary" />
                            </div>
                            <p className='mx-auto'>Already have an account? <Link to='/login' className='text-blue-700 font-semibold'>Login Now!</Link></p>
                        </form>
                        <div className="divider">or</div>
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <div className="mx-6 mb-6">

                                <button onClick={handleGoogleSignin} className="btn w-full">
                                    <span className='flex items-center'><FcGoogle size={30} />Login with Google</span>
                                </button>
                            </div>
                            <div className="mx-6 mb-6">
                                <button onClick={handleFacebookSignin} className="btn w-full">
                                    <span className='flex items-center'><FaFacebook className='text-blue-600' size={30} /> Login with Facebook</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
