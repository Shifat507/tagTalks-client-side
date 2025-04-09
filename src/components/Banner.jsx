import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../providers/AuthProvider';
import logo from '../assets/logos/tagTalksLogo.png'
import { FaRegNewspaper } from 'react-icons/fa';
import { FaPenToSquare } from 'react-icons/fa6';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useSearch } from '../context/SearchContext';
const Banner = () => {
    const { user } = useContext(AuthContext);
    const { search, setSearch } = useSearch();
    console.log(search);
    

    return (
        <div className=''>
            <div className='flex items-center gap-5'>
                <div className="avatar online hidden md:block">
                    <div className="w-12 rounded-full">
                        {
                            user ? <img src={user?.profileURL} /> : <img src={logo} />
                        }
                    </div>
                </div>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    {
                        user ? <input onKeyUp={(e) => setSearch(e.target.value)} type="text" className="grow" placeholder={`What conversation are you looking for today, ${user?.displayName}?`} /> : <input type="text" className="grow" placeholder={`What conversation are you looking for today?`} />
                    }
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
            </div>

            <div className='grid grid-cols-3 px-4 py-1 gap-3 border-2 border-base-200 rounded-lg mt-2'>
                <Link to='/popular-post' className="btn hover:bg-blue-300 btn-xs sm:btn-sm md:btn-md">
                    <FaRegNewspaper size={20} />
                    <span className='hidden md:block'>Popular Contents</span>

                </Link>

                <Link to='/createPost' className="btn hover:bg-blue-300 btn-xs sm:btn-sm md:btn-md"><FaPenToSquare size={20} /> <span className='hidden md:block'>Post</span></Link>

                <Link to='/help' className="btn hover:bg-blue-300 btn-xs sm:btn-sm md:btn-md"><IoMdHelpCircleOutline size={20} /> <span className='hidden md:block'>Help</span></Link>
            </div>
        </div>
    );
};

export default Banner;