import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/BASE_URL";
import { Link } from "react-router-dom";

const Latestblog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const page = 1;
  const limit = 5;

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs?page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error("Failed to fetch latest blogs");
        }
        const data = await response.json();
        setLatestBlogs(data?.blogs);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, [page, limit]);

  if (loading) {
    return <div className="flex justify-center items-center">
      <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
    </div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {latestBlogs.map((blog, index) => (
        <div
          key={index}
          className="flex items-start gap-4 border-b pb-4 last:border-none"
        >
          <div className="flex-grow">
            <Link to={`/blog-detail/${blog?.slug}`}>
              <h4 className="text-md font-semibold">{blog?.title}</h4>
            </Link>
            <div className="text-md text-gray-500 flex items-center gap-1">
              <span className="text-sky-500 font-bold text-xl">•</span>
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(blog?.createdAt))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Latestblog;
