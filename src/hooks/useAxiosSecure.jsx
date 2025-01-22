import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';



const axiosSecure = axios.create({
    baseURL : 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate()
    // // request interceptor to add authorization header to every secure call to the API
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        // console.log('request stops by interceptors', token);
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    )

    // // intercept for 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },  async(error)=>{
        const status = error.response.status;
        console.log('Error Code in interceptor: ', status);
        if(status === 401 ||  status=== 403){
            // console.log('ki shomossha');
            await logout();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure
};

export default useAxiosSecure;