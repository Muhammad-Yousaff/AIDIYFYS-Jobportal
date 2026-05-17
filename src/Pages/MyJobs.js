import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Arrow from "../components/Arrow"
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { BASE_URL } from '../utils/BASE_URL';

export const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const [jobCount, setJobCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [DateRange, setDateRange] = useState("all")
    const itemsPerPage = 20;

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setUserEmail(userEmail);
        }
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setIsLoading(true);

                if (!userEmail) return;

                const response = await fetch(
                    `${BASE_URL}/myJobs/${userEmail}?page=${currentPage + 1}&limit=${itemsPerPage}&dateRange=${DateRange}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                const { jobs: fetchedJobs, totalPages, totalJobs } = await response.json();

                setJobs(fetchedJobs);
                setJobCount(totalJobs);
                setPageCount(totalPages);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [userEmail, currentPage, DateRange]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this job!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${BASE_URL}/job/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged === true) {
                            Swal.fire(
                                'Deleted!',
                                'Job has been deleted.',
                                'success'
                            );
                            setJobs(prevJobs => prevJobs.filter(job => job?._id !== id));
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting job:', error);
                    });
            }
        });
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 min-h-[80vh] mt-28">
            <div className='my-jobs-container'>
                <h1 className='text-sky-500 font-sans text-2xl text-bold text-center mb-10'> All Jobs </h1>
                <hr className="border-gray-300 my-4" />
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-white shadow">
                            <div className="flex flex-row justify-between items-center space-y-4">
                                <div className="w-full sm:w-auto text-center sm:text-left">
                                    <h3 className="font-semibold text-lg text-blueGray-700">
                                        All Jobs: {jobCount || 0}
                                    </h3>
                                </div>
                                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                    <select
                                        value={DateRange}
                                        onChange={(event) => setDateRange(event.target.value)}
                                        className="bg-gray-200 text-base text-blueGray-700 rounded-md p-2 outline-none cursor-pointer w-auto"
                                    >
                                        <option value="all">All</option>
                                        <option value="1-month">Last 1 Month</option>
                                        <option value="2-months">Last 2 Months</option>
                                        <option value="3-months">Last 3 Months</option>
                                        <option value="4-months">Last 4 Months</option>
                                        <option value="5-months">Last 5 Months</option>
                                        <option value="6-months">Last 6 Months</option>
                                    </select>
                                    <Link to="/post-job">
                                        <button
                                            className="bg-sky-500 text-white active:bg-sky-600 text-sm font-bold uppercase p-3 rounded-md outline-none focus:outline-none w-auto ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Post A New Job
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Title
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Company Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Salary
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                {isLoading ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                <img src="/images/loader.gif" alt="Loading..." style={{ height: "150px", margin: "auto", display: "block" }} />
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {jobs?.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center p-3 font-semibold">No data found</td>
                                            </tr>
                                        ) : (
                                            jobs.map((job, index) => (
                                                <tr key={index}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job?.jobTitle ? job.jobTitle : "No Job Title"}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job?.companyName ? job?.companyName : "No Company Name"}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {job?.minPrice && job?.maxPrice ? (
                                                            <>
                                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                                £ {job?.minPrice} - £ {job?.maxPrice}
                                                            </>
                                                        ) : (
                                                            "No Salary Info"
                                                        )}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <Link to={`/edit-job/${job?._id}`}>
                                                            <button className='bg-sky-500 py-2 px-6 text-white rounded-sm'>Edit</button>
                                                        </Link>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <button onClick={() => handleDelete(job?._id, job?.image)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                )}
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
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
            </section>
            <Arrow />
        </div>
    );

};
