import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { MdAdminPanelSettings, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FaBan, FaRegUserCircle } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] , refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make admin this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, do it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${user._id}`)
                    .then(res => {
                        refetch()
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Done",
                                text: `${user.name} is admin now`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div className='w-11/12 mx-auto mb-8 h-screen'>
            <div className='flex justify-between items-center mb-8 mt-4'>
                <h1 className='text-3xl font-semibold'>Manage users</h1>
                <h1 className='text-lg font-semibold'>Total Users: {users.length}</h1>
            </div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-blue-500 text-lg text-white'>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>User Email</th>
                            <th className='text-center'>Make Admin</th>
                            <th className='text-center'>Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, idx) => <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <div>
                                        <div className="font-bold">{user.name}</div>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{user.email}</div>

                                    </div>
                                </td>

                                <td className='flex justify-center'>
                                    {
                                        user?.role === 'admin' ? 
                                        <button className=' text-red-400'><GrUserAdmin size={20} /></button> : <button onClick={() => handleMakeAdmin(user)} className=' text-red-400'><FaRegUserCircle size={20} /></button>

                                    }
                                    
                                    
                                    
                                </td>
                                <td className='text-center'>
                                    <div className="badge badge-primary badge-outline">{user.userBadge}</div>
                                </td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;