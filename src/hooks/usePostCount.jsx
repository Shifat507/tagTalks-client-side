import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const usePostCount = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [postCount, setPostCount] = useState(null); // Initial state set to null
    const [loading, setLoading] = useState(true); // Loading state to handle async data fetching

    // Fetch post count using useEffect
    {
        user && useEffect(() => {
            const fetchPostCount = async () => {
                try {
                    const response = await axiosPublic.get(`/post/user/count/${user.email}`);
                    const responseCount = response.data.count
                    setPostCount(responseCount); // Set post count data
                } catch (error) {
                    console.error('Error fetching post count:', error);
                } finally {
                    setLoading(false); // Stop loading after fetching
                }
            };
    
            if (user.email) {
                fetchPostCount();
            }
        }, [user.email, axiosPublic]);
        console.log(postCount);
    }

    
    return {postCount};
};

export default usePostCount;