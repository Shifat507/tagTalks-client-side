import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const announcement = {
      title,
      description,
      date: new Date().toISOString(), // Add the current date and time
    };
    console.log(announcement);
    try {
      const res = await axiosSecure.post("/announcement", announcement);
      console.log(res.data);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Make an Announcement
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter announcement description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md shadow hover:bg-blue-600 transition-colors"
        >
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default Announcement;
