import React, { useEffect, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import TypewriterText from "../Pages/TypewriterText";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Slider3 from "../Bgimg/bgslide3.jpg"
import Mobileslide from "../Bgimg/bgslide1.jpeg"
import { IoPricetags } from "react-icons/io5";

const Banner = ({ query, handleInputChange, handleLocationChange, selectedLocation, handleCategories, selectedCategory }) => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCityFocus = () => {
    setIsCityOpen(true);
  };

  const handleCityBlur = () => {
    setIsCityOpen(false);
  };

  const handleCategoryFocus = () => {
    setIsCategoryOpen(true);
  };

  const handleCategoryBlur = () => {
    setIsCategoryOpen(false);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="relative h-[100vh] w-full bg-cover bg-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 h-[100vh]"
      ></div>
      <div
        className="xl:px-24 px-10 py-14 h-[100vh] flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${isMobile ? Mobileslide : Slider3})`,
        }}
      >
        <div className="relative w-full md:w-[80%] flex flex-col items-center justify-center z-20">
          <TypewriterText text="Find Your New Job Today." />
          <div className="text-center">
            <p className="text-lg text-white font-bold  drop-shadow-lg">
              We Can Help You Succeed
            </p>
            <p className="text-xl text-white mb-8  font-bold drop-shadow-lg">
              Browse Thousands Of Jobs From Top Companies
            </p>
          </div>
          <form className="w-full mt-6">
            <div className="flex flex-col md:flex-row w-full">
              {/* Job Title Input */}
              <div className="relative bg-gray-100 flex rounded shadow-md ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-500 md:w-1/3 w-full">
                <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title, Skills or Company"
                  id="title"
                  className="block w-full border-0 outline-none bg-transparent appearance-none py-3 pl-10 text-gray-900 placeholder-gray-500 sm:text-sm sm:leading-6 pr-12"
                  onChange={handleInputChange}
                  value={query}
                />
              </div>
              {/* City Select */}
              <div className="relative bg-gray-100 flex rounded shadow-md ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-500 md:w-1/3 w-full">
                <FiMapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="city"
                  id="city"
                  className="block w-full border-0 outline-none bg-transparent appearance-none py-3 pl-10 text-gray-900 placeholder-gray-500 sm:text-sm sm:leading-6 pr-12"
                  onChange={(event) => handleLocationChange(event.target.value)}
                  value={selectedLocation}
                  onFocus={handleCityFocus}
                  onBlur={handleCityBlur}
                >
                  <option value="">Select a city</option>
                  <option value="">All</option>
                  <option value="Dubai">Dubai</option>
                  <option value="United-Arab-Emirates">United Arab Emirates</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Birmingham">Birmingham</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Glasgow">Glasgow</option>
                  <option value="Edinburgh">Edinburgh</option>
                  <option value="Sheffield">Sheffield</option>
                  <option value="Oxford">Oxford</option>
                  <option value="Bristol">Bristol</option>
                  <option value="Norwich">Norwich</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Dublin">Dublin</option>
                  <option value="Nottingham">Nottingham</option>
                  <option value="Derby">Derby</option>
                </select>
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  {isCityOpen ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
                </div>
              </div>

              {/* Category Select */}
              <div className="relative bg-gray-100 flex rounded shadow-md ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-500 md:w-1/3 w-full">
                <TbCategory className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="category"
                  id="category"
                  className="block w-full border-0 outline-none bg-transparent appearance-none py-3 pl-10 text-gray-900 placeholder-gray-500 sm:text-sm sm:leading-6 pr-12"
                  onChange={(event) => handleCategories(event.target.value)}
                  value={selectedCategory}
                  onFocus={handleCategoryFocus}
                  onBlur={handleCategoryBlur}
                >
                  <option value="">Select a Category</option>
                  <option value="">All</option>
                  <option value="InformationTechnology">Information Technology</option>
                  <option value="Healthcare-Nursing">Healthcare and Nursing</option>
                  <option value="Engineering-Technical">Engineering and Technical</option>
                  <option value="LifeSciencesHealthcare">Life Sciences & Healthcare</option>
                  <option value="Education-Teaching">Education and Teaching</option>
                  <option value="Sales-Marketing">Sales and Marketing</option>
                  <option value="Hospitality-Catering">Hospitality and Catering</option>
                  <option value="Construction-Trades">Construction and Trades</option>
                  <option value="Retail">Retail</option>
                  <option value="Creative-Design">Creative and Design</option>
                  <option value="AccountingFinance">Accounting / Finance</option>
                  <option value="DistributionLogistics">Distribution/Logistics</option>
                  <option value="Transport-Logistics">Transport and Logistics</option>
                  <option value="Legal-Compliance">Legal and Compliance</option>
                  <option value="OilGas">Oil & Gas</option>
                  <option value="Social-Care">Social Care</option>
                  <option value="LegalProfessionalServices">Legal & Professional Services</option>
                  <option value="SalesBusinessDevelopment">Sales/Business Development</option>
                  <option value="HealthcareMedical">Healthcare & Medical</option>
                  <option value="HumanResource">Human Resource</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Media-Communications">Media and Communications</option>
                  <option value="Science-Research">Science and Research</option>
                  <option value="DesignMultimedia">Design & Multimedia</option>
                  <option value="Government">Government</option>
                  <option value="Public-Sector">Public Sector</option>
                  <option value="Real-Estate">Real Estate</option>
                  <option value="Property-Management">Property Management</option>
                  <option value="Engineering">Engineering</option>
                </select>
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  {isCategoryOpen ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
                </div>
              </div>
            </div>
          </form>
          <div className="text-center">
            <p className="text-lg text-white font-bold flex drop-shadow-lg mt-4 gap-3">
              <IoPricetags size={20}/> UK jobs , Jobs in the UK , Jobs in London , Best IT jobs in London
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
