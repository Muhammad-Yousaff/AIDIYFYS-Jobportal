import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Arrow from '../components/Arrow';
import { BASE_URL } from '../utils/BASE_URL';
import Apply from './Apply';
import toast, { Toaster } from 'react-hot-toast';
import Login from '../components/Login';
import SignUp from '../components/Signup';
import { Helmet, HelmetProvider } from "react-helmet-async";

const JobDetails = () => {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [companyEmail, setCompanyEmail] = useState('')
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/job/${slug}`);
                if (response.ok) {
                    const jobData = await response.json();
                    // console.log(jobData)
                    setJob(jobData);
                } else {
                    toast.error('Error fetching job details:', response.status);
                }
            } catch (error) {
                toast.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [slug]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);


    const handleApply = (companyInfo) => {
        if (!userName) {
            Swal.fire({
                title: 'Please log in or Sign up',
                text: 'You need to log in or sign up to apply for this job',
                icon: 'warning',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Sign Up',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsLoginOpen(true);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    setSignupOpen(true);
                }
            });
        } else {
            setIsApplyOpen(true);
            setCompanyEmail(companyInfo);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-28">
                <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
        );
    }

    const relativeTime = moment(job?.jobPosting).fromNow();
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        Top {job?.jobTitle || "Job"} Jobs in the UK | Software, Development, Data & More - Aidifys.com
                    </title>
                    <meta
                        name="description"
                        content={`Discover top UK jobs across ${job?.jobTitle || "various industries"}, healthcare, finance, engineering & more at Aidifys.com. Browse full-time, part-time, remote & freelance job opportunities in major cities like London, Manchester & Birmingham. Start your job search today!`}
                    />
                </Helmet>
                <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-start w-[80vw] min-h-[80vh] mt-28">
                    <div className="w-full md:w-3/4 mb-8 md:mb-0 md:pr-8 flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{job?.jobTitle}</h1>
                        <div className="flex items-center mb-4">
                            <p className="text-gray-700 mr-4"><b>Posted Date </b> {relativeTime}</p>
                        </div>
                        <h2 className='text-2xl md:text-3xl font-bold'>Job Details</h2>
                        <button className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900 self-end" onClick={() => handleApply(job)}>
                            Apply
                        </button>
                        <hr className="border-gray-300 my-4" />
                        <p className='text-gray-700 mb-4 mt-1 '><span className='text-xl font-bold'>Required Skills</span><br />
                            <span className='font-semibold mt-2'>{job?.skills && job?.skills.join(', ')}</span>
                        </p>
                        <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: job?.description.replace(/\n/g, '<br />') }} />

                    </div>
                    <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
                        <div className="text-center mt-5">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">Company Information</h2>
                        </div>
                        <div className='flex justify-center'>
                            <img src={job?.image} alt={job?.companyName} className='w-44 h-44' />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 mt-3 ">
                            <Link to={`/company-jobs/${job?.companyId}`}>{job?.companyName}</Link>
                        </h3>
                        <div className="flex flex-wrap items-center mb-2">
                            <p className="text-gray-700 mr-4 mb-2 md:mb-0 md:mr-0 md:pr-4">
                                <b>Location:</b>
                                <Link to={`/location-jobs/${job?.jobLocation}`}>  {job?.jobLocation}</Link>
                            </p><br />
                        </div>
                        <div className="flex items-center mb-2">
                            <p className="text-gray-700 mr-4"><b>Employment Type:</b> {job?.employmentType}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <p className="text-gray-700 mr-4"><b>Experience Level:</b> {job?.experienceLevel}</p>
                        </div>
                        <div className="flex items-center">
                            {job?.minPrice && job?.maxPrice && (
                                <p className="text-gray-700 mr-4">
                                    <b>Salary Range: </b> £ {job?.minPrice} - {job?.maxPrice}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center">
                            {job?.salaryType && (
                                <p className="text-gray-700 mr-4 ">
                                    <b>Salary Type:</b> {job?.salaryType}
                                </p>
                            )}
                        </div>
                        {/* <div className="flex items-center">
                    <p className="text-gray-700 mr-4"><b>Company Email:</b> {job?.postedBy}</p>
                </div> */}
                    </div>
                    <Arrow />
                    {isApplyOpen && <Apply setIsApplyOpen={setIsApplyOpen} companyInfo={companyEmail} />}
                    {isLoginOpen && (
                        <Login
                            setLoginOpen={setIsLoginOpen}
                            setsignupOpen={setSignupOpen}
                            setUserName={setUserName}
                        />
                    )}
                    {SignupOpen && (
                        <SignUp
                            setsignupOpen={setSignupOpen}
                            setLoginOpen={setIsLoginOpen}
                            setUserName={setUserName}
                        />
                    )}
                    <Toaster />
                </div>
            </HelmetProvider>
        </>
    );
};

export default JobDetails;
