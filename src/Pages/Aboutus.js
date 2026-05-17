import React from "react";
import Aboutimg from "../Bgimg/Aboutus.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";

const About = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>About Us</title>
                    <meta name="description"
                        content="Learn more about Aidifys, our mission, values, and commitment to connecting 
                        job seekers with top opportunities across industries. Discover how we empower careers 
                        and support businesses." />
                    <meta property="og:title" content="About Us - Aidifys" />
                    <meta property="og:description"
                        content="Discover the story behind Aidifys. Our platform is dedicated to empowering 
                        job seekers and businesses with innovative hiring solutions." />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
                    <meta property="og:url" content="https://www.aidifys.com/about-us" />
                </Helmet>
                <div>
                    {/* <div className="relative overflow-hidden h-[50vh] md:h-[70vh] w-full">
                <img
                    src={Aboutimg}
                    alt="About Us"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div> */}
                    <div className="px-4 sm:px-8 lg:px-20 mt-28">
                        <h1 className="text-sky-500 font-sans text-2xl md:text-3xl font-bold text-center mt-9 mb-4">
                            About Us
                        </h1>
                        <hr className="mb-4 border-t border-gray-300"></hr>

                        <p className="text-justify mb-4">
                            At Aidifys Hiring, we believe in turning career dreams into reality by
                            connecting talented individuals with opportunities that matter. Whether you're an aspiring professional or an
                            established expert, our platform is designed to simplify your job search and help you find the perfect match.
                        </p>

                        <p className="text-justify mb-4">
                            Once upon a time, people believed that finding the right job was as impossible as Alice navigating Wonderland. At Aidifys Hiring, we strive to change that narrative. Our mission is to transform the job hunt into a seamless and rewarding journey.
                            We understand the challenges job seekers face—whether it’s uncertainty about where to start or feeling lost in the endless maze of opportunities. Aidifys Hiring exists to simplify this process by offering an intuitive and user-friendly job portal. Our platform is designed to bridge the gap between talent and opportunity, helping individuals and businesses alike find the right fit.
                        </p>

                        <p className="text-justify mb-4">
                            Imagine stepping into a world where every job begins with a meaningful connection—whether you're searching for a position that matches your skills or a company seeking to complete its team. At Aidifys Hiring, we ensure that our platform is not just another job board but a community dedicated to empowering career growth and creating success stories.
                        </p>

                        <h4 className="text-lg font-bold mb-4">Our dynamic platform includes:</h4>

                        <p className="mb-2">
                            <b>Effortless Job Applications: </b>
                            Navigate roles tailored to your skills and preferences.
                        </p>
                        <p className="mb-2">
                            <b>Company Insights: </b>
                            Learn about employers before you apply.
                        </p>
                        <p className="mb-20">
                            <b>Advanced Filters: </b>
                            Refine your search for the perfect match.
                        </p>
                    </div>
                </div>
            </HelmetProvider>
        </>

    );
};

export default About;
