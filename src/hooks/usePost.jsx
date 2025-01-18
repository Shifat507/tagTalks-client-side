import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const usePost = (currentPage, itemPerPage) => {
    const axiosPublic = useAxiosPublic();

    const {data : posts=[], isPaused: loading, refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/post?page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        }
    })
    return [posts, loading, refetch]
};

export default usePost;