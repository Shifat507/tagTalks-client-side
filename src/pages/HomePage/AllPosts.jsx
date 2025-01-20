import React, { useEffect, useState } from 'react';
import Post from './Post'; // Assume this is the component to display a single post
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllPosts = ({ category }) => {
    console.log('Category: ', category);
    
    const [count, setCount] = useState(0);  // Total post count
    const [currentPage, setCurrentPage] = useState(0);  // Current page number
    const [posts, setPosts] = useState([]);  // List of posts for the current page
    const [loading, setLoading] = useState(false);  // Loading state

    const axiosPublic = useAxiosPublic();
    const itemPerPage = 5;  // Number of posts per page

    // Fetch the total post count
    useEffect(() => {
        const fetchPostCount = async () => {
            try {
                let res;
                if (category) {
                    res = await axiosPublic.get(`/postsCount/${category}`);
                } else {
                    res = await axiosPublic.get('/postsCount');
                }
                setCount(res.data.count);
            } catch (error) {
                console.error('Error fetching post count:', error);
            }
        };

        fetchPostCount();
    }, [category, axiosPublic]);

    // Fetch posts for the current page and category
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let res;
                if (category) {
                    // Fetch posts for the selected category
                    res = await axiosPublic.get(`/post/${category}`, {
                        params: {
                            page: currentPage,
                            size: itemPerPage,
                        },
                    });
                } else {
                    // Fetch posts for all categories
                    res = await axiosPublic.get('/post', {
                        params: {
                            page: currentPage,
                            size: itemPerPage,
                        },
                    });
                }
                setPosts(res.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category, currentPage, itemPerPage, axiosPublic]);

    // Pagination logic
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
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
                                className={`join-item btn btn-square ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                type="button"
                                aria-label={`Page ${page + 1}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= numberOfPages - 1}
                        className={`btn border-2 border-gray-300 ml-1 ${currentPage >= numberOfPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
