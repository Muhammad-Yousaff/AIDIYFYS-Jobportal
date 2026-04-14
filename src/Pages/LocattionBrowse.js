import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/BASE_URL';


const LocationBrowse = () => {
    const [jobsData, setJobsData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${BASE_URL}/all-jobs`)
            .then(response => response?.json())
            .then(data => {
                setJobsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const getJobCount = (jobLocation) => {
        const jobLocationJobs = jobsData?.filter(job => job?.jobLocation?.toLowerCase() === jobLocation?.toLowerCase());
        return jobLocationJobs?.length;
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-28">
                <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
        );
    }


    return (
        <>
            <div className='flex flex-col px-10'>
                <h2 className='mb-5 text-2xl container text-bold text-sky-500 font-sans'>
                    Browse by Locations
                </h2>
                <hr className='p-5' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center mb-10 px-10">
                <div className=" bg-gray-100 p-4 rounded-lg">
                    {[
                        { name: 'London', jobLocation: 'London' },
                        { name: 'Manchester', jobLocation: 'Manchester' },
                        { name: 'Birmingham', jobLocation: 'Birmingham' },
                        { name: 'Liverpool', jobLocation: 'Liverpool' },
                        { name: 'City of Westminster', jobLocation: 'CityofWestminster' },
                        { name: 'Dubai', jobLocation: 'Dubai' },

                    ].map(({ name, jobLocation }) => (
                        <Link to={`/location-jobs/${jobLocation}`}>
                            <div key={jobLocation} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                                    {name}
                                </h3>

                                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer font-bold">
                                    {jobsData?.length ? getJobCount(jobLocation) : 0}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg">
                    {[
                        { name: 'Glasgow', jobLocation: 'Glasgow' },
                        { name: 'Edinburgh', jobLocation: 'Edinburgh' },
                        { name: 'Sheffeild', jobLocation: 'Sheffeild' },
                        { name: 'Oxford', jobLocation: 'Oxford' },
                        { name: 'Bristol', jobLocation: 'Bristol' },
                        { name: 'United Arab Emirates', jobLocation: 'United-Arab-Emirates' },

                    ].map(({ name, jobLocation }) => (
                        <Link to={`/location-jobs/${jobLocation}`}>
                            <div key={jobLocation} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                                    {name}
                                </h3>

                                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer font-bold">
                                    {jobsData?.length ? getJobCount(jobLocation) : 0}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>
                <div className=" bg-gray-100 p-4 rounded-lg">
                    {[
                        { name: 'Norwich', jobLocation: 'Norwich' },
                        { name: 'Cambridge', jobLocation: 'Cambridge' },
                        { name: 'Dublin', jobLocation: 'Dublin' },
                        { name: 'Nottingham', jobLocation: 'Nottingham' },
                        { name: 'Derby', jobLocation: 'Derby' },

                    ].map(({ name, jobLocation }) => (
                        <Link to={`/location-jobs/${jobLocation}`}>
                            <div key={jobLocation} className="bg-white py-3 px-3 rounded-lg mt-3 flex justify-between">
                                <h3 className="text-sm font-bold cursor-pointer hover:text-[#98d8f4]">
                                    {name}
                                </h3>

                                <p className="bg-[#e7f8fd] text-gray-900 px-2 cursor-pointer font-bold">
                                    {jobsData?.length ? getJobCount(jobLocation) : 0}
                                </p>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LocationBrowse;
