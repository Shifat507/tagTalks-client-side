import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import announcementImage from "../assets/icons/announce.png";
import { Link } from 'react-router-dom';

const Notifications = () => {
  const axiosPublic = useAxiosPublic();
  const { data: notifications = [], isLoading, isError } = useQuery({
    queryKey: ["infos"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcement");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <p>Error fetching notifications.</p>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Left Side - Announcements */}
      <div className="md:w-8/12">
        <h1 className="text-2xl font-bold mb-4">All Announcements</h1>
        <div className="grid grid-cols-1 gap-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={notification.image}
                    alt={notification.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-lg font-medium">{notification.name}</p>
                    <p className="text-sm text-gray-500">
                      Posted on:{" "}
                      {new Date(notification.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={announcementImage} alt="" width={35} />
                  <h2 className="text-xl font-semibold">{notification.title}</h2>
                </div>
                <p className="text-gray-600 mt-2">{notification.description}</p>
              </div>
            ))
          ) : (
            <p>No notifications available.</p>
          )}
        </div>
      </div>

      {/* Right Side - Quick Links */}
      <div className="md:w-4/12 p-4 border rounded-lg shadow-md bg-white md:fixed right-0 top-36">
        <h2 className="text-lg font-semibold mb-3">📌 Quick Links</h2>
        <ul className="space-y-2 text-blue-600">
          <li><Link to="/communityGuidelines">➤ Community Guidelines</Link></li>
          <li><Link to="/help">➤ Help & Support</Link></li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-3">🔥 Trending Announcements</h2>
        <ul className="space-y-2 text-gray-700">
          <li>⭐ New Event Coming Soon!</li>
          <li>⭐ Company Policy Update</li>
          <li>⭐ Employee of the Month</li>
        </ul>

        
      </div>
    </div>
  );
};

export default Notifications;
