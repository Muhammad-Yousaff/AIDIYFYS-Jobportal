import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiType } from "react-icons/fi";
import Arrow from "../components/Arrow";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { BASE_URL } from '../utils/BASE_URL';
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";

const Savedjob = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchUserInfo = async () => {
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (!loggedInUserEmail) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user-info/${loggedInUserEmail}`);
      if (!response.ok) throw new Error('Failed to fetch user info');

      const data = await response.json();
      setSavedJobs(data?.likedJobs || []);

      if (data?.likedJobs?.length > 0) {
        const jobResponses = await Promise.all(
          data.likedJobs.map(slug =>
            fetch(`${BASE_URL}/job/${slug}`)
              .then(res => res.ok ? res.json() : null)
          )
        );
        setJobDetails(jobResponses.filter(job => job));
      }
    } catch (error) {
      console.error('Error fetching user or job info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLike = async (slug) => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('UserId');

    if (!userId || !token) {
      toast.error('Please log in to like/unlike this job.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/job/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug: slug,
          userId: userId,
          action: savedJobs.includes(slug) ? 'unlike' : 'like',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (savedJobs.includes(slug)) {
          const updatedSavedJobs = savedJobs.filter((slug) => slug !== slug);
          setSavedJobs(updatedSavedJobs);
          setJobDetails((prev) => prev.filter((job) => job.slug !== slug));
          localStorage.setItem('likedJobs', JSON.stringify(updatedSavedJobs));
          toast.success('Job removed from save history successfully!');
        } else {
          const updatedSavedJobs = [...savedJobs, slug];
          setSavedJobs(updatedSavedJobs);
          localStorage.setItem('likedJobs', JSON.stringify(updatedSavedJobs));

          const newJobDetails = await fetch(`${BASE_URL}/job/${slug}`).then((res) =>
            res.json()
          );
          setJobDetails((prev) => [...prev, newJobDetails]);
          toast.success('Job saved successfully!');
        }
      } else {
        toast.error('Error:', data.message || 'Failed to like/unlike the job.');
      }
    } catch (error) {
      toast.error('Error liking/unliking job:', error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const Savedjobuser = savedJobs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(savedJobs?.length / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
      </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <div className="flex justify-center mt-28 h-[100vh]">
        <div className="w-[80%]">
          {jobDetails.length > 0 ? (
            <>
              <h3 className="text-lg font-bold mb-4">{jobDetails.length} Saved Jobs</h3>
              {jobDetails.map((job) => (
                <section
                  key={job._id}
                  className="card border border-gray-300 rounded mb-4 hover:shadow-lg p-3"
                >
                  <div className="text-gray-500 cursor-pointer mr-auto flex-1 flex justify-end" onClick={() => handleLike(job?.slug)}>
                    {savedJobs.includes(job?.slug) ? (
                      <FaHeart className="text-xl sm:text-2xl text-red-500" />
                    ) : (
                      <FaRegHeart className="text-xl sm:text-2xl" />
                    )}
                  </div>
                  <Link
                    to={`/job/${job?.slug}`}
                    className="flex flex-row sm:flex-row items-start gap-4"
                  >
                    <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                      <img
                        src={job?.image}
                        alt={job?.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <h4 className="text-primary mb-1 text-base font-semibold">{job?.companyName}</h4>
                        <h3 className="text-xl font-bold">{job?.jobTitle}</h3>
                        <p className="text-sm text-gray-600">{job?.skills?.join(', ')}</p>
                        <div className="text-primary/70 text-sm flex flex-wrap gap-2 font-bold">
                          <span className="flex items-center gap-1">
                            <FiMapPin /> {job?.jobLocation}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock /> {job?.employmentType}
                          </span>
                          {job?.minPrice && job?.maxPrice && job?.salaryType ? (
                            <span className="flex items-center gap-1">
                              £ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}
                            </span>
                          ) : job?.salaryType && (
                            <span className="flex items-center gap-1">
                              <FiType /> {job?.salaryType}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <FiCalendar /> {job.jobPosting}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-primary/70 hidden sm:block">
                          {job.description?.slice(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                </section>
              ))}
            </>
          ) : (
            <h3 className="text-lg font-bold text-gray-600 text-center">No saved jobs 😧</h3>
          )}
          {savedJobs && savedJobs.length > 0 ? (
            <div className='flex justify-end'>
              <ReactPaginate
                previousLabel={<GrPrevious size={20} />}
                nextLabel={<GrNext size={20} />}
                breakLabel={<HiDotsHorizontal size={20} />}
                breakClassName={"pagination__break"}
                pageCount={pageCount}
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
              />
            </div>
          ) : (null)}
        </div>
        <Arrow />
        <Toaster />
      </div>
    </motion.div>
  );
};

export default Savedjob;
