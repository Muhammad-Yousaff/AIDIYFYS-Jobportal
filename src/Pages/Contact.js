import React, { useState } from 'react';
import Lottie from 'react-lottie';
import Letter from "../Data/Letter.json";
import toast from 'react-hot-toast';
import Arrow from '../components/Arrow';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Contactus = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    description: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Letter,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted with data:", formData);
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      description: ""
    });
    toast.success("Email sent successfully!");
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contact Us</title>
          <meta name="description" content="Get in touch with Aidifys for any inquiries, support, or 
          collaboration opportunities. We're here to assist with your job search, hiring needs, and more. 
          Contact us today!" />
          <meta property="og:title" content="Contact Us - Aidifys" />
          <meta property="og:description" content="Reach out to Aidifys for assistance with job searches, 
          hiring, or general inquiries. We are here to help!" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:image" content="https://www.aidifys.com/Aidifys-hiring.jpg" />
          <meta property="og:url" content="https://www.aidifys.com/contact" />
        </Helmet>
        <div className=" mb-10 mt-20">
          <div className="py-[3%] px-[5%] md:px-[14%] ">
            <h3 className='text-sky-500 font-sans text-2xl text-bold text-center   mb-4 '> Contact US</h3>
            <hr className='mb-2' ></hr>
            <div className="flex flex-col justify-between mt-4 gap-14 ">
              <div className="pt-8 w-[100%] flex mx-auto gap-6">
                <div className="w-full lg:w-[60%]">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-400 text-gray-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4 outline-blue"
                      placeholder="Your Name"
                      required
                    />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-400 text-gray-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4 outline-blue"
                      placeholder="Email"
                      required
                    />
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-400 text-gray-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4 outline-blue"
                      placeholder="Phone"
                      required
                    />
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-400 text-gray-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-4 outline-blue"
                      placeholder="Enquiry Message"
                      required
                      spellCheck="true"
                    />
                    <button
                      type="submit"
                      className="text-white bg-blue hover:bg-white hover:text-blue hover:border hover:border-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-6 py-2 text-center h-[42px] w-[100px]"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                <div className="justify-center pt-4 hidden lg:flex">
                  <Lottie options={defaultOptions} height={300} width={350} />
                </div>
              </div>
            </div>
          </div>
          <Arrow />
        </div>
      </HelmetProvider>
    </>

  )
}

export default Contactus;
