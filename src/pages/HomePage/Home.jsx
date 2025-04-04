import React, { useState } from 'react';
import Banner from '../../components/Banner';
import AllPosts from './AllPosts';
import { MdOutlineCategory } from 'react-icons/md';
import useAdmin from '../../hooks/useAdmin';
import evodiaPerfume from '../../assets/brandImg/evodia.jpg';
import jhankerMBook from '../../assets/brandImg/Jhanker-M-book.jpg';
import { Link } from 'react-router-dom';
import { TfiAnnouncement } from 'react-icons/tfi';

const Home = () => {
    const [category, setCategory] = useState('');
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const [isAdmin] = useAdmin();

    return (
        <div className='flex min-h-screen items-start mt-2'>
            {/* Left Sidebar - Categories */}
            <aside className='w-72 px-4 md:block hidden sticky top-20 h-[calc(100vh-5rem)] '>
                <div>
                    <h1 className='text-lg font-semibold mb-3 flex items-center gap-3'>
                        <MdOutlineCategory size={30} /> Categories
                    </h1>
                    <select 
                        onChange={handleCategory} 
                        className="select select-primary w-full max-w-xs"
                    >
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

                {isAdmin && (
                    <Link 
                        to='/announcement' 
                        className="text-lg font-semibold mb-3 flex items-center gap-3 mt-4 hover:bg-gray-200 px-4 py-2 rounded-md"
                    >
                        <TfiAnnouncement size={20} /> Announcement
                    </Link>
                )}
            </aside>

            {/* Main Content */}
            <div className='flex-1 px-6 md:px-24'>
                <Banner />
                <AllPosts category={category} />
            </div>

            {/* Right Sidebar - Sponsored */}
            <aside className='w-72 px-4 md:block hidden sticky top-20 h-[calc(100vh-5rem)] '>
                <h2 className='text-xl font-bold  mb-3'>Sponsored</h2>
                <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-4">
                    <div className="relative">
                        <img
                            src={evodiaPerfume}
                            className="w-full h-40 object-cover"
                            alt="Evodia Perfume"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded">
                            Sponsored
                        </span>
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-bold text-gray-800">Evodia</h3>
                        <span>Bleu de Chanel</span>
                    </div>
                </div>
                <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                        <img
                            src={jhankerMBook}
                            className="w-full h-40 object-cover"
                            alt="Jhanker Mahbub Book"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded">
                            Sponsored
                        </span>
                    </div>
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-bold text-gray-800">Jhankar Mahbub</h3>
                        <span>Going Through Struggle</span>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Home;