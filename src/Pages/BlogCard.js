import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils/BASE_URL";
import { HelmetProvider, Helmet } from "react-helmet-async";

const BlogCard = ({ article, onDelete }) => {
  const userEmail = localStorage.getItem("userEmail");

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the blog permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${BASE_URL}/delete-blog/${article._id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete the blog");
        }

        const responseData = await response.json();

        await Swal.fire({
          title: "Deleted!",
          text: responseData.message,
          icon: "success",
        });

        onDelete(article._id);
      } catch (error) {
        console.error("Error deleting blog:", error.message);

        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
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
        <div className="bg-white shadow-lg overflow-hidden flex flex-col h-full rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <img
            src={article?.imageUrl}
            alt={article?.alttag}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6 py-8 flex flex-col flex-grow">
            <Link to={`/blog-detail/${article?.slug}`}>
              <h3 className="text-xl font-semibold mb-4 font-heading text-left cursor-pointer">{article?.title}</h3>
            </Link>
            {article?.content && (
              <p className="text-sm text-black flex mb-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: article?.content.slice(0, 120),
                  }}
                  className="prose text-left"
                />
              </p>
            )}
            <div className="flex justify-between items-center mt-auto">
              <Link to={`/blog-detail/${article?.slug}`}>
                <button className="text-white px-4 py-2 rounded bg-sky-500 font-semibold hover:bg-sky-600">
                  Read more
                </button>
              </Link>
              {userEmail === "usama.mang0901@gmail.com" && (
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 font-semibold hover:bg-red-900 px-4 py-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
};

export default BlogCard;
