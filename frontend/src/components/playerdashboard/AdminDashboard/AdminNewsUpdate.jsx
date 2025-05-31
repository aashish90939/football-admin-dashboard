import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminNewsUpdate = () => {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/posts?type=news");
      const data = await res.json();
      setNewsList(data);
    } catch (err) {
      console.error("Error fetching news:", err);
      toast.error("Failed to fetch news");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      ...formData,
      type: "news",
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });

      if (res.ok) {
        toast.success("News posted successfully");
        setFormData({ title: "", body: "" });
        fetchNews();
      } else {
        toast.error("Failed to post news");
      }
    } catch (err) {
      console.error("Error posting news:", err);
      toast.error("Error while posting news");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("News deleted successfully");
        fetchNews();
      } else {
        toast.error("Failed to delete news");
      }
    } catch (err) {
      console.error("Error deleting news:", err);
      toast.error("Error while deleting news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Post News</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="News Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          name="body"
          placeholder="News Details"
          value={formData.body}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={4}
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
        >
          Post News
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Latest News</h3>
      <ul className="space-y-3">
        {newsList.map((news) => (
          <li key={news.id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{news.title}</h4>
            <p className="text-sm text-gray-700">{news.body}</p>
            <small className="text-gray-500">
              {new Date(news.created_at).toLocaleDateString()}
            </small>
            <button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => handleDelete(news.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AdminNewsUpdate;
