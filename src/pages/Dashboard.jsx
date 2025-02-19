import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import DashboardInfo from "../components/dashboardInfo";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-md md:h-screen">

                {
                    isAdmin ? <>
                        <div className="p-4 text-center">
                            <h1 className="text-xl font-bold text-indigo-600">Admin Dashboard</h1>
                        </div>
                        <nav className="mt-8">
                            <ul className="space-y-4">
                                <Link to='/' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Home
                                </Link>
                                <Link to='/dashboard/adminProfile' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Admin Profile
                                </Link>
                                <Link to='/dashboard/manageUsers' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Manage Users
                                </Link>
                                {/* <Link to='/dashboard/activities' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Reported Comments or Activities
                                </Link> */}
                                <Link to='/dashboard/announcement' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Make Announcement
                                </Link>
                            </ul>
                        </nav>
                    </> : <>
                        <nav className="mt-8">
                            <div className="p-4 text-center">
                                <h1 className="text-xl font-bold text-indigo-600">User Dashboard</h1>
                            </div>
                            <ul className="space-y-4">
                                <Link to='/' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Home
                                </Link>
                                <Link to='/dashboard/userProfile' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    My Profile
                                </Link>
                                <Link to='/dashboard/createPost' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    Add Post
                                </Link>
                                <Link to='/dashboard/myPosts' className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                                    My Posts
                                </Link>
                            </ul>
                        </nav>
                    </>
                }
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet></Outlet>

                {/* Trending Topics
                <section>
                    <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                #WebDevelopment
                            </span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                #ArtificialIntelligence
                            </span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                #CloudComputing
                            </span>
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                                #Freelancing
                            </span>
                        </div>
                    </div>
                </section> */}
            </main>
        </div>
    );
};

export default Dashboard;
