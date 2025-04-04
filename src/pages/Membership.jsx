import React, { useContext, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import premiumIcon from '../assets/lotties/premium.json';
import goldBadge from '../assets/lotties/goldBadge.json';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Membership = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    useEffect(() => {
        const checkMember = async () => {
            try {
                setIsLoading(true);
                const res = await axiosPublic.get(`/user/${user.email}`);
                setMember(res.data[0].userBadge);
            } catch (error) {
                console.error("Failed to fetch member data", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkMember();
    }, [axiosPublic, user.email]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg font-medium text-gray-600">Checking your membership status...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {member === 'Bronze' ? (
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="md:flex">
                            <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col items-center justify-center">
                                <div className="mb-6">
                                    <Lottie 
                                        animationData={premiumIcon} 
                                        loop={true}
                                        className="w-40 h-40"
                                    />
                                </div>
                                <h1 className="text-3xl font-bold text-white text-center mb-2">Upgrade to Premium</h1>
                                <div className="flex items-center">
                                    <Lottie 
                                        animationData={goldBadge} 
                                        className="w-12 h-12"
                                    />
                                    <p className="ml-2 text-white font-medium">Unlock Exclusive Benefits</p>
                                </div>
                                <ul className="mt-6 space-y-3 text-white">
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Priority Support
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Upload Unlimited Post
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Advanced Features
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 p-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto"
                    >
                        <div className="mb-6 flex justify-center">
                            <Lottie 
                                animationData={goldBadge} 
                                loop={true}
                                className="w-24 h-24"
                            />
                        </div>
                        <h2 className="text-3xl font-bold  mb-4">Premium Member</h2>
                        <p className="text-gray-600 mb-6">Thank you for being a valued VIP member of our community!</p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-green-700">You now have access to all premium features and content.</p>
                        </div>
                        <Link 
                            to="/" 
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Membership;