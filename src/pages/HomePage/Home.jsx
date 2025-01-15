import React from 'react';
import Banner from '../../components/Banner';
import AllPosts from './AllPosts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <AllPosts></AllPosts>
        </div>
    );
};

export default Home;