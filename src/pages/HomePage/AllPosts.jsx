import React, { useEffect, useState } from 'react';
import Post from './Post'; // Assume this is the component to display a single post
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllPosts = () => {
    // State to hold the total count of posts
    const [count, setCount] = useState(0);
    // Current page number
    const [currentPage, setCurrentPage] = useState(0);
    // List of posts for the current page
    const [posts, setPosts] = useState([]);
    // Loading state
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();
    const itemPerPage = 5; // Number of posts per page

    // Calculate the total number of pages
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    // Fetch the total post count
    useEffect(() => {
        const fetchPostCount = async () => {
            const res = await axiosPublic.get('/postsCount');
            setCount(res.data.count);
        };

        fetchPostCount();
    }, [axiosPublic]);

    // Fetch posts for the current page
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get('/post', {
                    params: {
                        page: currentPage,
                        size: itemPerPage,
                    },
                });
                setPosts(res.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [axiosPublic, currentPage, itemPerPage]);

    // Handle previous page
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Handle next page
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-md mx-auto my-24"></span>;
    }

    return (
        <div>
            {/* Render posts */}
            {posts.map((post, idx) => (
                <Post key={post._id || idx} post={post} />
            ))}

            {/* Pagination controls */}
            <div className="flex justify-center my-10">
                <div>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className={`btn border-2 border-gray-300 mr-1 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Previous Page
                    </button>

                    <div className="join">
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`join-item btn btn-square ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                    }`}
                                type="button"
                                aria-label={`Page ${page + 1}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= pages.length - 1}
                        className={`btn border-2 border-gray-300 ml-1 ${currentPage >= pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
