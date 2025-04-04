import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const MainLayout = () => {
    return (
        <div>
            <header className='sticky top-0 z-50 '>
                <Navbar></Navbar>
            </header>
            <main className=''>
                
                <div className=''>
                    <Outlet></Outlet>
                </div>
                
            </main>
            <footer>
                {/* <Footer></Footer> */}
            </footer>
        </div>
    );
};

export default MainLayout;