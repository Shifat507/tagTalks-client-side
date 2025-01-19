import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import premiumIcon from '../assets/lotties/premium.json'
import goldBadge from '../assets/lotties/goldBadge.json'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';

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
    console.log(member);

    return (
        <div>
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
            </div> : <div><h2>You are already our member</h2></div>
            }
        </div>
    );
};

export default Membership;