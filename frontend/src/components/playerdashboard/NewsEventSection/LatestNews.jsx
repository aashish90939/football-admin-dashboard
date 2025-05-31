import React from "react";
import { useDashboardContext } from "../../../context/DashboardContext";

const LatestNews = () => {
  const { getPostsByType, loading } = useDashboardContext();
  const newsPosts = getPostsByType("news");
  //console.log("News from context:", newsPosts);

  return (
    <div>
      <h2 className="text-lg font-bold text-yellow-600 mb-4">Latest News</h2>

      {loading ? (
        <p className="text-gray-500">Loading news...</p>
      ) : newsPosts.length > 0 ? (
        <div className="space-y-4">
          {newsPosts.map((news) => (
            <div
              key={news.id}
              className="p-4 rounded-xl shadow bg-white border-l-4 border-yellow-500"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-yellow-700">
                  {news.title}
                </h3>
                <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full capitalize">
                  {news.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                🗓 {new Date(news.created_at).toLocaleDateString()}
              </p>
              {news.body && (
                <p className="text-sm text-gray-500">{news.body}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No news posted yet. Please check back later!
        </p>
      )}
    </div>
  );
};

export default LatestNews;
