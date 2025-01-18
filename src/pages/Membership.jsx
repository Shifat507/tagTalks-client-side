import React from 'react';
import Lottie from 'lottie-react';
import premiumIcon from '../assets/lotties/premium.json'
import goldBadge from '../assets/lotties/goldBadge.json'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const Membership = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
    return (
        <div>
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
        </div>
    );
};

export default Membership;