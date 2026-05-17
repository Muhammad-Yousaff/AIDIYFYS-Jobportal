import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiMapPin, FiType } from "react-icons/fi";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import Arrow from '../components/Arrow';
import { BASE_URL } from '../utils/BASE_URL';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Jobloction = () => {
    const { jobLocation } = useParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobCount, setJobCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const jobsPerPage = 10;

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${BASE_URL}/location-jobs/${jobLocation}?page=${currentPage + 1}&limit=${jobsPerPage}`
                );

                if (response.ok) {
                    const { jobs: fetchedJobs, totalPages, totalJobs } = await response.json();
                    setJobs(fetchedJobs);
                    setJobCount(totalJobs);
                    setPageCount(totalPages);
                } else {
                    toast.error(`Error fetching job details: ${response.status}`);
                }
            } catch (error) {
                toast.error(`Error fetching job details: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [jobLocation, currentPage]);


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
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const JobCard = ({ job }) => {
        const Description = job?.description?.slice(0, 120);

        return (
            <section key={job._id} className='card border border-gray-300 rounded mb-4 hover:shadow-lg p-3'>
                <Link to={`/job/${job?.slug}`} className='flex flex-row sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
                    <div className='w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
                        <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className='text-primary mb-1 text-base sm:text-sm lg:text-xl'>{job?.companyName}</h4>
                        <h3 className='sm:text-sm lg:text-xl font-semibold'>{job?.jobTitle}</h3>
                        <h6 className='sm:text-sm lg:text-xl font-semibold'>
                            {job?.skills && job?.skills.join(', ')}
                        </h6>
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
                        <p className='text-sm sm:text-base text-primary/70 hidden sm:block'>
                            {Description}
                        </p>
                    </div>
                </Link>
            </section>
        );
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        Jobs in  {jobLocation || "Job"} - Full-Time, Part-Time, Remote & Freelance Roles | Aidifys.com
                    </title>
                    <meta
                        name="description"
                        content={`Browse the latest job vacancies in ${jobLocation || "various industries"},  Find full-time, 
                        part-time, remote, freelance jobs in industries like IT, marketing, finance, healthcare, and more at Aidifys.com.`}
                    />
                </Helmet>
                <motion.div
                    className="flex flex-col w-full cursor-pointer"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                >
                    <div className="flex justify-center mt-28">
                        <div className="w-[80vw] min-h-[80vh]">
                            <div>
                                <h3 className="text-lg font-bold mb-2 ml-6">{jobCount} Jobs in {jobLocation}</h3>
                            </div>
                            {jobs.map(job => (
                                <JobCard key={job?._id} job={job} />
                            ))}
                            {jobs && jobs.length > 0 ? (
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
                                        forcePage={currentPage}
                                    />
                                </div>
                            ) : (null)}
                        </div>
                        <Arrow />
                        <Toaster />
                    </div>
                </motion.div>
            </HelmetProvider>
        </>
    );
};

export default Jobloction;
