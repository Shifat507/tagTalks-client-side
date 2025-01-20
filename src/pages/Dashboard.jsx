import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    const {user} = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold text-indigo-600">TagTalks</h1>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link to='/userProfile' href="#" className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                My Profile
              </Link>
            </li>
            <li>
              <Link to='/createPost' href="#" className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                Add Post
              </Link>
            </li>
            <li>
              <Link to='/myPosts' href="#" className="block py-2 px-4 hover:bg-indigo-100 rounded-md">
                My Posts
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Create Post
          </button>
        </header>

        {/* User Profile */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{user?.displayName}</h3>
                <p className="text-gray-500">{user?.email}</p>
                <div className="flex space-x-4 mt-2 text-sm">
                  <span>Posts: <strong>120</strong></span>
                  <span>Comments: <strong>450</strong></span>
                  <span>Followers: <strong>300</strong></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="bg-white p-4 rounded-md shadow-md space-y-4">
            <div className="p-4 border-b">
              <h4 className="font-semibold">How to improve coding skills?</h4>
              <p className="text-gray-500 text-sm">
                Posted in <strong>#Coding</strong> - 2 hours ago
              </p>
            </div>
            <div className="p-4 border-b">
              <h4 className="font-semibold">React vs Angular: Which is better?</h4>
              <p className="text-gray-500 text-sm">
                Posted in <strong>#Frontend</strong> - 1 day ago
              </p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold">How to stay consistent in learning?</h4>
              <p className="text-gray-500 text-sm">
                Posted in <strong>#Motivation</strong> - 3 days ago
              </p>
            </div>
          </div>
        </section>

        {/* Trending Topics */}
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
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
