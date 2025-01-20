import React from 'react';

const useCategory = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-3 flex items-center gap-3'><MdOutlineCategory size={30} /> Categories</h1>
            <select className="select select-primary w-full max-w-xs">
                <option disabled selected>Select Any Tag</option>
                <option>Technology</option>
                <option>Science</option>
                <option>Education</option>
                <option>Politic</option>
                <option>Sports</option>
                <option>Health</option>
                <option>Lifestyle</option>
            </select>
        </div>
    );
};

export default useCategory;