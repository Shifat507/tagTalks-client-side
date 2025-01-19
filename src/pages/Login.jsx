import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {
    const user = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const fromPath = '/'; // Default path after login if none is specified.

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                // console.log(result.user);
                navigate(fromPath, { replace: true });
            })
            .catch((error) => {
                console.error('Login failed:', error);
                alert('Login failed. Please check your credentials.');
            });
    };

    const handleGoogleSignin = () => {
        googleSignIn()
            .then(res => {
                console.log(res);
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
                console.log(res.user);
                navigate('/')
            })
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row md:w-10/12 mx-auto">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                            <p className="mx-auto">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-700 font-semibold">
                                    Signup Now!
                                </Link>
                            </p>
                        </form>
                        <div className="mx-6 mb-6">
                            <div className="divider">or</div>
                            <button onClick={handleGoogleSignin} className="btn w-full">
                                <FcGoogle size={20} className="flex" />
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
