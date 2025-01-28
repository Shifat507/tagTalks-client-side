import React, { useEffect, useState } from 'react';
import Post from './Post'; // Assume this is the component to display a single post
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllPosts = ({ category }) => {
    const [count, setCount] = useState(0); // Total post count
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const [posts, setPosts] = useState([]); // List of posts for the current page
    const [loading, setLoading] = useState(false); // Loading state

    const axiosPublic = useAxiosPublic();
    const itemPerPage = 5; // Number of posts per page

    // Fetch the total post count
    useEffect(() => {
        const fetchPostCount = async () => {
            try {
                const res = category
                    ? await axiosPublic.get(`/postsCount/${category}`)
                    : await axiosPublic.get('/postsCount');
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
                const res = category
                    ? await axiosPublic.get(`/post/${category}`, {
                        params: { page: currentPage, size: itemPerPage },
                    })
                    : await axiosPublic.get('/post', {
                        params: { page: currentPage, size: itemPerPage },
                    });
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

    // Generate page numbers with ellipses
    const generatePageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const ellipsis = '...';

        if (numberOfPages <= maxPagesToShow) {
            for (let i = 0; i < numberOfPages; i++) {
                pages.push(i);
            }
        } else {
            const startPages = [0, 1];
            const endPages = [numberOfPages - 2, numberOfPages - 1];
            const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
                (page) => page > 1 && page < numberOfPages - 2
            );

            const combinedPages = [...new Set([...startPages, ...middlePages, ...endPages])];

            combinedPages.forEach((page, index) => {
                if (index > 0 && page - combinedPages[index - 1] > 1) {
                    pages.push(ellipsis);
                }
                pages.push(page);
            });
        }

        return pages;
    };

    const pages = generatePageNumbers();

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
        return <span className="loading loading-spinner loading-md flex justify-center my-24"></span>;
    }

    return (
        <div>
            {/* Render posts */}
            {posts.map((post, idx) => (
                <Post key={post._id || idx} post={post} />
            ))}

            {/* Pagination controls */}
            <div className="flex flex-wrap justify-center my-10 space-x-2">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className={`hidden md:block btn border-2 border-gray-300 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                   
                    <span className='hidden md:block'>Previous</span>
                </button>

                <div className="join flex flex-wrap justify-center space-x-2">
                    {pages.map((page, idx) =>
                        page === '...' ? (
                            <span key={idx} className="join-item btn btn-square">
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`join-item btn btn-square ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                type="button"
                                aria-label={`Page ${page + 1}`}
                            >
                                {page + 1}
                            </button>
                        )
                    )}
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= numberOfPages - 1}
                    className={`hidden md:block btn border-2 border-gray-300 ${currentPage >= numberOfPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className='hidden md:block'>Next</span>
                </button>
            </div>

        </div>
    );
};

export default AllPosts;
