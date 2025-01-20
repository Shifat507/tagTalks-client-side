import React, { useState } from 'react';
import Banner from '../../components/Banner';
import AllPosts from './AllPosts';
import Categories from '../../components/Categories';
import { MdOutlineCategory } from 'react-icons/md';

const Home = () => {
    const [category, setCategory] = useState('');
    console.log(category);
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    console.log(category);
    
    return (
        <div className='mx-auto flex justify-between'>
            {/* category */}
            <aside className='w-72 px-4 md:block hidden'>
                <div>
                    <h1 className='text-2xl font-semibold mb-3 flex items-center gap-3'><MdOutlineCategory size={30} /> Categories</h1>
                    <select onChange={handleCategory} className="select select-primary w-full max-w-xs">
                        <option disabled selected>Select Any Tag</option>
                        <option value='technology'>Technology</option>
                        <option value='science'>Science</option>
                        <option value='education'>Education</option>
                        <option value='politic'>Politic</option>
                        <option value='sports'>Sports</option>
                        <option value='health'>Health</option>
                        <option value='lifestyle'>Lifestyle</option>
                    </select>
                </div>
            </aside>
            <div className='w-full'>
                <Banner></Banner>

                <AllPosts category={category}></AllPosts>
            </div>
            <aside className='w-72 px-4  md:block hidden'>
                <h1 className='text-2xl font-semibold'>Announcement</h1>
            </aside>
        </div>
    );
};

export default Home;