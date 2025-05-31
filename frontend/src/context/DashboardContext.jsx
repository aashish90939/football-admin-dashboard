import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const getPostsByType = (type) => {
    return posts.filter((post) => post.type === type);
  };

  return (
    <DashboardContext.Provider
      value={{ posts, loading, getPostsByType, fetchPosts }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
