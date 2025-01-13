import React from 'react';
import logo from '../assets/logos/tagTalksLogo.png'
import { Link, NavLink } from 'react-router-dom';
import { TbHomeFilled } from 'react-icons/tb';
import { FaIdCard } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { BsPersonFillAdd } from 'react-icons/bs';
const Navbar = () => {
    const links = <>
        <li><NavLink to='/' className='mx-2 md:mx-5 tooltip tooltip-bottom text-blue-600' data-tip="Home" ><TbHomeFilled size={25} /></NavLink></li>
        <li><NavLink to='/membership' className='mx-2 md:mx-5 tooltip tooltip-bottom text-blue-600' data-tip="Membership" ><FaIdCard size={28} /></NavLink></li>
        <li><NavLink to='/notification' className='mx-2 md:mx-5 tooltip tooltip-bottom text-blue-600' data-tip="Notifications" ><IoIosNotifications size={28} /></NavLink></li>
        <li><NavLink to='/joinUs' className='mx-2 md:mx-5 tooltip tooltip-bottom text-blue-600' data-tip="Join Us" ><BsPersonFillAdd size={25} /></NavLink></li>

    </>
    return (
        <div className='px-8'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="text-2xl font-bold flex items-center gap-2">
                        <img className='w-10 rounded-full' src={logo} alt="" />
                        <div>
                            <span className='text-yellow-400 m-0 p-0'>Tag</span>
                            <span className='text-green-500 m-0 p-0'>Talks</span>
                        </div>
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to='/login' className="bg-blue-600 px-4 py-2 rounded-md text-md text-white font-semibold hover:bg-blue-500">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;