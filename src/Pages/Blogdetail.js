import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/BASE_URL";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Latestblog from "./Latestblog";
import { FiCalendar } from "react-icons/fi";

const Blogdetail = () => {
    const { slug } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blog-detail/${slug}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch blog data");
                }
                const data = await response.json();
                setBlogData(data?.blog);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [slug]);

    if (loading) return <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
    </div>;
    if (error) return <div className="text-center text-red-600 py-20 mt-16 min-h-screen">Error: {error}</div>;
    if (!blogData) return <div className="text-center py-20 mt-16 min-h-screen">No blog data found.</div>;

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{blogData?.title}</title>
                    <meta name="description" content={blogData?.description} />
                    <meta property="og:title" content="Blog" />
                    <meta property="og:description" content={blogData?.description} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:url" content="https://www.aidifys.com/blog" />
                </Helmet>
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 mt-28">
                    <header className="mb-8">
                        {/* ///// category title ///// */}
                        {/* <div className="text-sm font-bold text-gray-500 uppercase mb-2">
            Health And Nutrition
        </div> */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                            {blogData?.title}
                        </h1>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <span>By Admin</span>
                            <span> <FiCalendar /></span>
                            <span>
                                {blogData?.createdAt
                                    ? new Intl.DateTimeFormat("en-US", {
                                        weekday: "short",
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }).format(new Date(blogData?.createdAt))
                                    : "N/A"}
                            </span>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Blog Content */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <img
                                    src={blogData?.imageUrl}
                                    alt={blogData?.alttag}
                                    title={blogData?.alttag}
                                    className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
                                />
                            </div>

                            <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
                                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-tight">
                                    {blogData?.title}
                                </h1>
                                <p className="mt-10 text-lg">
                                    <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
                                </p>
                            </article>
                        </div>
                        {/* Sidebar */}
                        <aside
                            className="space-y-8 lg:sticky lg:top-28 lg:self-start"
                            style={{ maxHeight: 'calc(100vh - 112px)', overflowY: 'auto' }}
                        >
                            <div className="">
                                <h3 className="text-xl font-bold">Latest Blog</h3>
                                <div className="w-16 h-[3px] bg-sky-500 mt-1"></div>
                            </div>
                            <div>
                                <Latestblog />
                            </div>
                            <Link to={'/blog'}>
                                <button className="w-full max-w-sm mx-auto bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition">
                                    View More
                                </button>
                            </Link>
                        </aside>
                    </div>
                </div>

            </HelmetProvider>
        </>
    );
};

export default Blogdetail;
