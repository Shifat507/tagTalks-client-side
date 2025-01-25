import React from 'react';
import errorPage from '../../public/errorPage404/errorPage.png'
const PageNotFound = () => {
    return (
        <div className='flex justify-center items-center bg-blue-600 h-screen'>
            <img src={errorPage} alt="" />
        </div>
    );
};

export default PageNotFound;