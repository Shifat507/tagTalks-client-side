import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';
const useAllPosts = () => {

    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    // user's all posts
    const {data : posts=[], isPending: loading, refetch} = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/posts/user/${user?.email}`);
            return res.data;
        }
    })
    return [posts, loading, refetch]
};

export default useAllPosts;