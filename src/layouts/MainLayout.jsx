import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='mx-auto flex justify-between'>
                <aside className='w-80 px-4'>
                    <Categories></Categories>
                </aside>
                <div className='w-full mx-5'>
                    <Outlet></Outlet>
                </div>
                <aside className='w-96'>
                    <h1 className='text-2xl font-semibold'>Announcement</h1>
                </aside>
            </main>
            <footer>
                {/* <Footer></Footer> */}
            </footer>
        </div>
    );
};

export default MainLayout;