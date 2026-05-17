import React from 'react';
import {
    FaLaptopCode, FaHospital, FaHardHat, FaChalkboardTeacher, FaClipboardList, FaBriefcaseMedical, FaStore,
    FaSuitcase, FaGavel, FaBuilding, FaIndustry, FaPhoneAlt, FaUsers, FaTruck, FaMedkit, FaUniversity,
    FaBriefcase, FaRegFileAlt, FaInfoCircle, FaQuestionCircle,
    FaShieldAlt,
    FaHome
}
    from 'react-icons/fa';

const Sitemap = () => {
    const categories = [
        { name: 'Information Technology', icon: <FaLaptopCode />, link: 'categories/InformationTechnology' },
        { name: 'Healthcare and Nursing', icon: <FaBriefcaseMedical />, link: 'categories/Healthcare-Nursing' },
        { name: 'Engineering and Technical', icon: <FaHardHat />, link: 'categories/Engineering-Technical' },
        { name: 'Life Sciences & Healthcare', icon: <FaHospital />, link: 'categories/LifeSciencesHealthcare' },
        { name: 'Education and Teaching', icon: <FaChalkboardTeacher />, link: 'categories/Education-Teaching' },
        { name: 'Sales and Marketing', icon: <FaClipboardList />, link: 'categories/Sales-Marketing' },
        { name: 'Hospitality and Catering', icon: <FaStore />, link: 'categories/Hospitality-Catering' },
        { name: 'Construction and Trades', icon: <FaSuitcase />, link: 'categories/Construction-Trades' },
        { name: 'Construction and Facilities', icon: <FaBuilding />, link: 'categories/Construction-Facilities' },
        { name: 'Retail', icon: <FaStore />, link: 'categories/Retail' },
        { name: 'Administration', icon: <FaUsers />, link: 'categories/Administration' },
        { name: 'Creative and Design', icon: <FaChalkboardTeacher />, link: 'categories/Creative-Design' },
        { name: 'Accounting / Finance', icon: <FaClipboardList />, link: 'categories/AccountingFinance' },
        { name: 'Distribution/Logistics', icon: <FaTruck />, link: 'categories/DistributionLogistics' },
        { name: 'Transport and Logistics', icon: <FaTruck />, link: 'categories/Transport-Logistics' },
        { name: 'Legal and Compliance', icon: <FaGavel />, link: 'categories/Legal-Compliance' },
        { name: 'Oil & Gas', icon: <FaIndustry />, link: 'categories/OilGas' },
        { name: 'Social Care', icon: <FaMedkit />, link: 'categories/Social-Care' },
        { name: 'Supply Chain Operations', icon: <FaClipboardList />, link: 'categories/Supply-Chain-Operations' },
        { name: 'Legal & Professional Services', icon: <FaGavel />, link: 'categories/LegalProfessionalServices' },
        { name: 'Sales/Business Development', icon: <FaBriefcaseMedical />, link: 'categories/SalesBusinessDevelopment' },
        { name: 'Healthcare & Medical', icon: <FaBriefcaseMedical />, link: 'categories/HealthcareMedical' },
        { name: 'Human Resource', icon: <FaUsers />, link: 'categories/HumanResource' },
        { name: 'Manufacturing', icon: <FaIndustry />, link: 'categories/Manufacturing' },
        { name: 'Telecommunications', icon: <FaPhoneAlt />, link: 'categories/Telecommunications' },
        { name: 'Telecome', icon: <FaPhoneAlt />, link: 'categories/Telecome' },
        { name: 'Media and Communications', icon: <FaUsers />, link: 'categories/Media-Communications' },
        { name: 'Science and Research', icon: <FaUniversity />, link: 'categories/Science-Research' },
        { name: 'Design & Multimedia', icon: <FaLaptopCode />, link: 'categories/DesignMultimedia' },
        { name: 'Government', icon: <FaBuilding />, link: 'categories/Government' },
        { name: 'Public Sector', icon: <FaBuilding />, link: 'categories/Public-Sector' },
        { name: 'Real Estate', icon: <FaBuilding />, link: 'categories/Real-Estate' },
        { name: 'Property Management', icon: <FaBuilding />, link: 'categories/Property-Management' },
        { name: 'Procurement-Sourcing', icon: <FaClipboardList />, link: 'categories/Procurement-Sourcing' },
        { name: 'Engineering', icon: <FaHardHat />, link: 'categories/Engineering' },
        { name: 'Web-Developer', icon: <FaLaptopCode />, link: 'categories/Web-Developer' },
    ];

    return (
        <div className="px-5 py-10 mt-20">
            <h1 className="text-center text-3xl font-bold text-sky-500 mb-4">SITEMAP</h1>
            <hr className="mx-auto w-20 border-sky-500" />
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Main</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {[
                        { name: 'Start a Search', link: '/', icon: <FaHome /> },
                        { name: 'Browse Jobs', link: '/browsejobs', icon: <FaBriefcase /> },
                        { name: 'Blogs', link: '/blog', icon: <FaRegFileAlt /> },
                        { name: 'Contact Us', link: '/contact', icon: <FaPhoneAlt /> },
                        { name: 'About Us', link: '/about-us', icon: <FaInfoCircle /> },
                        { name: 'FAQ', link: '/faq', icon: <FaQuestionCircle /> },
                        { name: 'Term & Conditions', link: '/terms-conditions', icon: <FaClipboardList /> },
                        { name: 'Privacy', link: '/privacy', icon: <FaShieldAlt /> },
                    ].map((category, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 border p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <a href={category.link} className="flex items-center space-x-2 text-sky-500 font-semibold">
                                {category.icon}
                                <span>{category.name}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">List of Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href={category.link}
                            className="flex items-center space-x-2 border p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <span className="text-sky-500 font-semibold">{category.icon}</span>
                            <span className="text-sky-500 font-semibold">{category.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">List of Cities in UK</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-gray-700">
                    {[
                        'London',
                        'Seattle',
                        'Brisbane',
                        'Melbourne',
                    ].map((city, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <a
                                href={`/location-jobs/${city}`}
                                className="text-sky-500 font-semibold hover:text-sky-600 transition"
                            >
                                {city}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sitemap;
