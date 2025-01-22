import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import premiumIcon from '../assets/lotties/premium.json'
import goldBadge from '../assets/lotties/goldBadge.json'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Membership = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [member, setMember] = useState('');
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    const checkMember = async () => {
        const res = await axiosPublic.get(`/user/${user.email}`);
        setMember(res.data[0].userBadge);
    }
    checkMember();
    // console.log(member);

    return (
        <div className='w-11/12 mx-auto'>
            {
                member === 'Bronze' ? <div>
                    <Lottie animationData={premiumIcon} className='w-24'></Lottie>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-semibold '>Become A Member Now!</h1>
                        <Lottie animationData={goldBadge} className='w-16'></Lottie>
                    </div>

                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm></CheckoutForm>
                        </Elements>
                    </div>
                </div> : <div className='my-16'>
                    <div className='flex justify-center'><h2 className='text-green-500 font-semibold text-2xl'>You are already our vip member</h2>

                    </div>
                    <div className='my-6 flex justify-center'>
                        <Link to='/' className='btn btn-primary'>Back to Home</Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default Membership;