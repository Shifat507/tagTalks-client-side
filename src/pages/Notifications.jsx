import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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
    return <p>Loading notifications...</p>;
  }

  if (isError) {
    return <p>Error fetching notifications.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notification Page</h1>
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
              <h2 className="text-xl font-semibold">{notification.title}</h2>
              <p className="text-gray-600 mt-2">{notification.description}</p>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
