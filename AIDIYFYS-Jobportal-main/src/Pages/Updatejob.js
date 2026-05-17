import React, { useEffect } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/BASE_URL';
import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import toast, { Toaster } from 'react-hot-toast';


const Updatejob = () => {

  const { id } = useParams();
  const { jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, jobPosting, experienceLevel, image, employmentType
    , description, postedBy, skills, category } = useLoaderData();

  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState(null);

  useEffect(() => {
    setSelectedOptions(skills.map(skill => ({ value: skill, label: skill })));
  }, [skills]);

  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userId = localStorage.getItem('UserId');
    data.skills = selectedOptions.map(option => option.value);
    data._id = id;
    data.userId = userId;
    data.superAdminEmail = "usama.mang0901@gmail.com";

    fetch(`${BASE_URL}/update-job`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        if (result.message && result.status === true) {
          toast.success("Job updated successfully!!!");
          navigate("/my-job");
        } else {
          toast.error("Update job failed: " + (result.message || "Unknown error"));
        }
        reset();
      })
      .catch(error => {
        console.error(error);
        toast.error("Update job failed");
      });
  };



  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "React", label: "React" },
    { value: "MS Office", label: "MS Office" },
    { value: "Oracle", label: "Oracle" },
    { value: "Flutter", label: "Flutter" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto x1:px-24 px-8 mt-28 mb-5">
      {/* Form */}
      <Toaster />
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/*First Row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input type="text" defaultValue={jobTitle} {...register("jobTitle")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input type="text" defaultValue={companyName} {...register("companyName")} className="create-job-input" />
            </div>
          </div>

          {/*2nd Row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input type="text" defaultValue={minPrice} {...register("minPrice")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input type="text" defaultValue={maxPrice} {...register("maxPrice")} className="create-job-input" />
            </div>
          </div>

          {/* 3rd Row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} defaultValue={salaryType} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input type="text" defaultValue={jobLocation} {...register("jobLocation")} className="create-job-input" />
            </div>
          </div>

          {/* 4th Row*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input type="date" defaultValue={jobPosting} {...register("jobPosting")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select defaultValue={experienceLevel} {...register("experienceLevel")} className="create-job-input">
                <option value="">Choose experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-Year">1 Year</option>
                <option value="2-Years">2 Years</option>
                <option value="3-Years">3 Years</option>
                <option value="5-Years">5 Years</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Highly-Experienced">Highly Experienced</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Category</label>
              <select defaultValue={category} {...register('category', { required: true })} className="create-job-input">
                <option value="">Choose category</option>
                <option value="InformationTechnology">Information Technology</option>
                <option value="Healthcare-Nursing">Healthcare and Nursing</option>
                <option value="Engineering-Technical">Engineering and Technical</option>
                <option value="LifeSciencesHealthcare">Life Sciences & Healthcare</option>
                <option value="Education-Teaching">Education and Teaching</option>
                <option value="Sales-Marketing">Sales and Marketing</option>
                <option value="Hospitality-Catering">Hospitality and Catering</option>
                <option value="Construction-Trades">Construction and Trades</option>
                <option value="Construction-Facilities">Construction and Facilities</option>
                <option value="Retail">Retail</option>
                <option value="Administration">Administration</option>
                <option value="Creative-Design">Creative and Design</option>
                <option value="AccountingFinance">Accounting / Finance</option>
                <option value="DistributionLogistics">Distribution/Logistics</option>
                <option value="Transport-Logistics">Transport and Logistics</option>
                <option value="Legal-Compliance">Legal and Compliance</option>
                <option value="OilGas">Oil & Gas</option>
                <option value="Social-Care">Social Care</option>
                <option value="Supply-Chain-Operations">Supply Chain Operations</option>
                <option value="LegalProfessionalServices">Legal & Professional Services</option>
                <option value="SalesBusinessDevelopment">Sales/Business Development</option>
                <option value="HealthcareMedical">Healthcare & Medical</option>
                <option value="HumanResource">Human Resource</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Telecome">Telecome</option>
                <option value="Media-Communications">Media and Communications</option>
                <option value="Science-Research">Science and Research</option>
                <option value="DesignMultimedia">Design & Multimedia</option>
                <option value="Government">Government</option>
                <option value="Public-Sector">Public Sector</option>
                <option value="Real-Estate">Real Estate</option>
                <option value="Property-Management">Property Management</option>
                <option value="Procurement-Sourcing">Procurement-Sourcing</option>
                <option value="Engineering">Engineering</option>
                <option value="Web-Developer">Web-Developer</option>
              </select>
              {errors.category && <p className="text-red-500">Category is required</p>}
            </div>
          </div>

          {/* 5th Row*/}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              value={selectedOptions}
              onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>
          {/* 6th Row*/}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              {/* <input type="url" defaultValue={image} {...register("companyLogo")} className="create-job-input" /> */}
              <img src={image} alt="Uploaded logo" className="mt-2 w-32 h-32 object-cover" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employement Type</label>
              <select defaultValue={employmentType} {...register("employmentType")} className="create-job-input">
                <option value="">Choose your employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>
          </div>

          {/* 7th Row*/}
          <div className="w-full"></div>
          <label className="block mb-2 text-lg">Job Description</label>
          <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
            rows={6} defaultValue={description}
            placeholder="As a Product Design Manager at GitLab, you will be responsible for managing a team of up to 5 talented Product Designers.” This approach can allow job seekers to envision themselves in the role so they can decide if it's the right fit for them."
            {...register("description")} />
          {/* Last Row*/}
          <div className="w-full ">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input type="email" defaultValue={postedBy} placeholder="Your Email" {...register("postedBy")} className="create-job-input" />
          </div>
          <input type="submit" className="block mt-12 bg-blue text-white font-semibold px-10 py-2 rounded-sm cursor-pointer" value="Update Job" />
        </form>
      </div>
    </div>
  )
}

export default Updatejob