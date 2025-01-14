import React from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

const Categories = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-3 flex items-center gap-3'><MdOutlineCategory size={30} /> Categories</h1>
            <details className="dropdown">
                <summary className="btn m-1">Tags <RxDropdownMenu size={25} /></summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a>Technology</a></li>
                    <li><a>Science</a></li>
                    <li><a>Education</a></li>
                    <li><a>Politic</a></li>
                    <li><a>Sports</a></li>
                    <li><a>Health</a></li>
                    <li><a>Lifestyle</a></li>
                </ul>
            </details>
        </div>
    );
};

export default Categories;