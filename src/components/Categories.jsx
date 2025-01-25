import React, { useEffect, useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

const Categories = () => {
    const [category, setCategory] = useState('');
    // console.log(category);
    const handleCategory = (e) => {
        const selectedCategory = e.target.value;
        localStorage.setItem('selectedCategory', selectedCategory);
    }
    useEffect(() => {
        // Clear localStorage on reload
        const clearLocalStorage = () => {
            localStorage.setItem('selectedCategory', '');
        };

        window.addEventListener('beforeunload', clearLocalStorage);
        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage);
        };
    }, []);
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-3 flex items-center gap-3'><MdOutlineCategory size={30} /> Categories</h1>
            <select onChange={handleCategory} className="select select-primary w-full max-w-xs">
                <option disabled defaultValue="Select Any Tag"></option>
                <option value='technology'>Technology</option>
                <option value='science'>Science</option>
                <option value='education'>Education</option>
                <option value='politic'>Politic</option>
                <option value='sports'>Sports</option>
                <option value='health'>Health</option>
                <option value='lifestyle'>Lifestyle</option>
            </select>
        </div>
    );
};

export default Categories;