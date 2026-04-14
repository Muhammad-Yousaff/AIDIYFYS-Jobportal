import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import { BASE_URL } from "../utils/BASE_URL";
import Sidebar from "../sidebard/Sidebar";
import Newsletter from "../components/Newsletter";
import Arrow from "../components/Arrow";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Browse from "./Browse";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsloading(true);
    fetch(`${BASE_URL}/all-jobs`)
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(data);
        setIsloading(false);
      });
  }, []);

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };
  const handleCategories = (Category) => {
    setSelectedCategory(Category);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }
  const filteredData = (jobs, selected, query, selectedLocation) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobTitleMatch = job?.jobTitle?.toLowerCase().includes(query.toLowerCase());
        const companyNameMatch = job?.companyName?.toLowerCase().includes(query.toLowerCase());
        return jobTitleMatch || companyNameMatch;
      });
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experiencedLevel, salaryType, employmentType, postingDate, category }) =>
        (category && category.toLowerCase() === selected.toLowerCase()) ||
        (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
        (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
        (postingDate && postingDate >= selected) ||
        (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
        (experiencedLevel && experiencedLevel.toLowerCase() === selected.toLowerCase()) ||
        (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
      );
    }

    if (selectedLocation) {
      filteredJobs = filteredJobs.filter(job =>
        job?.jobLocation?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    return filteredJobs;
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredItems = filteredData(jobs, selectedCategory, query, selectedLocation);
  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Find Top UK Jobs in IT, Marketing, Healthcare & More | Aidifys.com</title>
          <meta name="description"
            content="Discover top UK jobs across IT, healthcare, finance, engineering & more at 
            Aidifys.com. Browse full-time, part-time, remote & freelance job opportunities in major cities like London,
            Manchester & Birmingham. Start your job search today!" />
          <meta property="og:title" content="Find Top UK Jobs in IT, Marketing, Healthcare & More | Aidifys.com" />
          <meta property="og:description" content="Discover top UK jobs across IT, healthcare, finance, engineering & more at 
          Aidifys.com. Browse full-time, part-time, remote & freelance job opportunities in major cities like London,
          Manchester & Birmingham. Start your job search today!" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:url" content="https://www.aidifys.com/" />
        </Helmet>
        <Banner
          query={query}
          handleInputChange={handleInputChange}
          handleLocationChange={handleLocationChange}
          handleCategories={handleCategories}
        />
        <div className="bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 lg:px-6 px-4 py-8 lg:py-12">
          <div className="bg-white p-4 rounded md:col-span-1">
            <Sidebar handleChange={handleChange} handleClick={handleClick} />
          </div>
          <div className="bg-white p-4 rounded-sm md:col-span-2">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <img src="/images/loader.gif" alt="Loading..." style={{ height: "100px" }} />
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid gap-4">
                <Jobs Totaljobs={filteredItems?.length} />
                {paginatedJobs.map((job, i) => (
                  <Card key={i} data={job} />
                ))}
              </div>
            ) : (
              <p className="flex justify-center font-bold">No jobs found!</p>
            )}
            {filteredItems.length > itemsPerPage && (
              <div className="flex justify-end space-x-6 mt-4">
                <button onClick={prevPage} disabled={currentPage === 1}>
                  <MdArrowBackIos size={20} />
                </button>
                <span>
                  Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                </span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
                  <MdArrowForwardIos size={20} />
                </button>
              </div>
            )}
          </div>
          <div className="bg-white p-4 rounded md:col-span-1">
            <Newsletter />
          </div>
        </div>
        <Browse />
        <Arrow />
      </HelmetProvider>
    </div>
  );
};

export default Home;

