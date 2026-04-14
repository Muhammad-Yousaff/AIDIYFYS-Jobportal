import React from 'react';
import resumeSVG from '../resume.svg';
import Editor from './Editor';
import InputControl from '../components/InputControl/InputControl';

const CvBuilder = () => {


  const sections = {
    basicInfo: "BasicInfo",
    workExp: "Expierence",
    projects: "Projects",
    education: "Education",
    achievments: "Achievments",
    summary: "Summay",
    other: "Other",


  };
  return (
    <div className="mx-auto text-center xl:px-28 flex flex-wrap justify-center items-center mt-10">
      <div className="w-full md:w-1/2 order-2 md:order-1">
        <h4 className="lg:text-5xl text-bold font-sans text-black md:text-2xl">
          <span className='text-sky-500'>A Resume</span> that stands out!
        </h4>
        <h4 className="text-sky-500 lg:text-5xl font-sans mb-4 md:text-2xl">
          Make your own resume. <span className='text-black'>It's free</span>
        </h4>
        <p className="text-gray-800 text-2xl mt-4">Start building your resume now!</p>
        <div className="w-full mt-8 flex justify-center mb-4">
          <div className="flex gap-4">
            <button className="bg-sky-500 text-white rounded-full p-4 hover:bg-sky-600"></button>
            <button className="bg-green-500 rounded-full p-4 hover:bg-green-600"></button>
            <button className="bg-cyan-500 text-white rounded-full p-4 hover:bg-cyan-600"></button>
            <button className="bg-slate-500 text-white rounded-full p-4 hover:bg-slate-600"></button>
            <button className="bg-amber-500 text-white rounded-full p-4 hover:bg-amber-600"></button>
          </div>
        </div>
        <div className='flex justify-end w-full'>
          <button className="flex items-center justify-center bg-sky-600 text-white px-6 mb-8 py-2 hover:bg-sky-900 transition duration-300 transform hover:scale-110">
            Download
            <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path></svg>
          </button>
        </div>
        <div>
          <Editor sections={sections} />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
        <img
          className="max-w-xs h-auto transition duration-300 transform hover:scale-110"
          src={resumeSVG}
          alt="Resume"
        />
      </div>
    </div>


  );
};

export default CvBuilder;
