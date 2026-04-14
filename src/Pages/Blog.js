import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { BASE_URL } from "../utils/BASE_URL";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { HiDotsHorizontal } from 'react-icons/hi';
import Blogimg from "../Bgimg/blogbg.jpg"
import { HelmetProvider, Helmet } from "react-helmet-async";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      await fetchBlogs(currentPage, 9);
      setLoading(false);
    };

    loadBlogs();
  }, [currentPage]);

  const fetchBlogs = async (page, limit) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (response.ok) {
        const sortedBlogs = data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
        setTotalPages(data?.totalPages);
        setError(null);
      } else {
        setError(data.message || "Failed to load blogs");
        toast.error(data.message || "Failed to load blogs");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleDeleteBlog = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blog</title>
          <meta name="description"
            content="Explore insightful articles on career tips, job search strategies, and industry trends at
             Aidifys Blog. Stay updated with the latest hiring news, workplace advice, and professional growth 
             ideas to boost your career journey!" />
          <meta property="og:title" content="Blog" />
          <meta property="og:description" content="Explore insightful articles on career tips, job search 
          strategies, and industry trends at Aidifys Blog. Stay updated with the latest hiring news, workplace
           advice, and professional growth ideas to boost your career journey!" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:url" content="https://www.aidifys.com/blog" />
        </Helmet>
        <div className="relative bg-gray-800 text-white overflow-hidden h-[50vh] md:h-[70vh]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${Blogimg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.7,
            }}
          ></div>
          <div className="relative z-10 max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex items-end h-full">
            <div className="mt-24 pb-10">
              <div className="mb-4 flex items-center">
                <h2 className="ml-4 text-xl font-bold font-heading">BLOG</h2>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl uppercase font-heading md:leading-[70px]">
                OUR BLOG
              </h1>
              {userEmail === "usama.mang0901@gmail.com" && (
                <button
                  onClick={() => navigate("/add-blog")}
                  className="bg-sky-500 font-semibold text-white px-4 py-2 rounded hover:bg-sky-700 mt-3"
                >
                  Add Blog
                </button>
              )}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-full bg-black bg-opacity-50"></div>
        </div>
        <div className="pt-28 pb-20 bg-tertiary mb-28">
          {loading ? (
            <div className="flex justify-center items-center mt-28">
              <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">Error loading blogs: {error}</div>
          ) : (
            <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs?.length > 0 ? (
                  blogs.map((article, index) => (
                    <BlogCard key={index} article={article} onDelete={handleDeleteBlog} />
                  ))
                ) : (
                  <div className="text-center text-gray-500 flex justify-center">No blogs available.</div>
                )}
              </div>
              {blogs && blogs.length > 0 ? (
                <div className='flex justify-end mt-5'>
                  <ReactPaginate
                    previousLabel={<GrPrevious size={20} />}
                    nextLabel={<GrNext size={20} />}
                    breakLabel={<HiDotsHorizontal size={20} />}
                    breakClassName={"pagination__break"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    pageClassName={"pagination__page"}
                    pageLinkClassName={"pagination__link"}
                    previousClassName={"pagination__previous"}
                    nextClassName={"pagination__next"}
                    activeLinkClassName={"pagination__link--active"}
                    disabledClassName={"pagination__link--disabled"}
                    breakLinkClassName={"pagination__break"}
                    forcePage={currentPage - 1}
                  />
                </div>
              ) : (null)}
              <Toaster />
            </div>
          )}
        </div>
      </HelmetProvider>
    </>
  );
};

export default Blog;
