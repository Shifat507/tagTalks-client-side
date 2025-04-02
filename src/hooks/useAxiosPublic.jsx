import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL : 'https://tagtalks-server-side.vercel.app'
    // baseURL : 'http://localhost:5173'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;