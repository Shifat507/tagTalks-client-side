import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Stripe from 'stripe';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    // replace it by axiosSecure 
    const axiosPublic = useAxiosPublic();
    const price = 59;

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic, price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        //Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent :', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction Id :', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Now save the payment to DB
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }

                //update user info
                const updateRes = await axiosPublic.get(`/payment/${user.email}`)
                console.log(updateRes.data);

                // replace it by axiosSecure
                const paymentRes = await axiosPublic.post('/payment', payment)
                console.log('payment saved ', paymentRes);

                if (paymentRes.data?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/');
                }

            }
        }

    }
    return (
        <div className='md:w-2/4 mt-8'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <p className='text-sm text-red-500 mt-2'>{error}</p>
                {
                    transactionId && <p className='font-semibold'>Transaction Id: <span className='text-green-500 ml-2'>{transactionId}</span></p>
                }
                <button className='bg-blue-600 text-white px-8 py-1 rounded-md font-semibold mt-3' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;