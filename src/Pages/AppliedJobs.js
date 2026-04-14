import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiType } from "react-icons/fi";
import { BASE_URL } from '../utils/BASE_URL';
import Arrow from "../components/Arrow";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';

const AppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [jobCount, setJobCount] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const CompanyDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${BASE_URL}/user-applied-jobs?page=${currentPage + 1}&limit=${itemsPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const { jobs: fetchedJobs, totalPages, totalJobs } = await response.json();
                    setJobs(fetchedJobs);
                    setJobCount(totalJobs);
                    setPageCount(totalPages);
                } else {
                    toast.error('Error fetching job details:', response.status);
                }
            } catch (error) {
                toast.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        CompanyDetails();
    }, [currentPage]);

    if (loading) {
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
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <motion.div
            className="flex flex-col w-full cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
        >
            <div className='min-h-[80vh]'>
                <div className="flex justify-center mt-28">
                    <div className="w-[80%]">
                        {jobs && jobCount > 0 ? (
                            jobs.map(job => (
                                <section key={job._id} className='card border border-gray-300 rounded mb-4 hover:shadow-lg p-3'>
                                    <Link to={`/job/${job?.slug}`} className='flex flex-row sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
                                        <div className='w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
                                            <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between w-full">
                                            <div>
                                                <h3 className='sm:text-sm lg:text-xl font-semibold'>{job?.jobTitle}</h3>
                                                <span className='flex items-center gap-1 font-bold'>Applied Date :
                                                    {new Date(job?.appliedAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                                <h4 className='text-primary mb-1 text-base sm:text-sm lg:text-xl'>{job?.companyName}</h4>
                                                <div className='text-primary/70 text-sm sm:text-base flex flex-wrap sm:flex-row flex-row gap-1 font-bold'>
                                                    <span className='flex items-center gap-1'><FiMapPin /> {job?.jobLocation}</span>
                                                    <span className='flex items-center gap-1'><FiClock /> {job?.employmentType}</span>
                                                    {job?.minPrice && job?.maxPrice && job?.salaryType ? (
                                                        <span className="flex items-center gap-1">
                                                            £ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}
                                                        </span>
                                                    ) : job?.salaryType && (
                                                        <span className="flex items-center gap-1">
                                                            <FiType /> {job?.salaryType}
                                                        </span>
                                                    )}
                                                    <span className='flex items-center gap-1'><FiCalendar />
                                                        {new Date(job?.jobPosting).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                                <h6 className='sm:text-sm lg:text-xl font-semibold'>{job?.skills && job?.skills.join(', ')}</h6>
                                                {/* <p className='text-sm sm:text-base text-primary/70 hidden sm:block'>{job?.description?.slice(0, 150)}</p> */}
                                            </div>
                                        </div>
                                    </Link>
                                </section>
                            ))
                        ) : (
                            <div className="text-center font-bold text-black text-xl mt-10">
                                No jobs found.
                            </div>
                        )}
                    </div>

                </div>
                {jobs && jobCount > 0 ? (
                    <div className='flex justify-center'>
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
                            forcePage={currentPage}
                        />
                    </div>
                ) : (null)}
                <Arrow />
                <Toaster />
            </div>
        </motion.div>
    );
};

export default AppliedJobs;
