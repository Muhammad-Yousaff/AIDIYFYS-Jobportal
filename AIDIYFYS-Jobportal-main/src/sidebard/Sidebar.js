import React from 'react';
import Location from './Location'; 
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmployementType from './EmployementType';

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='space-y-5 hidden md:block'>
      <h3 className='text-lg font-bold mb-2 ml-4'>Filters</h3>
      <Location handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmployementType handleChange={handleChange} />
    </div>
  )
}

export default Sidebar

