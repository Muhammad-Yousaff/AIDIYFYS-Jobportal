import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { BASE_URL } from '../utils/BASE_URL';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error('Please select an image');
      return;
    }

    const localImageUrl = URL.createObjectURL(file);
    setImage(localImageUrl);
    toast.success('Image selected successfully');
  };

  const onSubmit = async (data) => {
    const userId = localStorage.getItem('UserId');
    const useremail = localStorage.getItem('userEmail');

    if (!image) {
      toast.error('Image upload is required!');
      return;
    }

    data.skills = selectedOptions.map(option => option.value);
    data.image = image;
    data.userId = userId;
    data.useremail = useremail;

    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/post-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Job added successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setSelectedOptions([]);
        setImage(null);
        navigate('/my-job');
      } else {
        toast.error("Failed to add job: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error(`Error posting job: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'C++', label: 'C++' },
    { value: 'React', label: 'React' },
    { value: 'MS Office', label: 'MS Office' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'Flutter', label: 'Flutter' },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto x1:px-24 px-8 mt-28 mb-10">
      <Toaster />
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <h1 className='container text-sky-500 font-sans text-2xl text-bold mb-4'>Post a New Job</h1>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input type="text" placeholder="Flutter Developer" {...register('jobTitle', { required: true })} className="create-job-input" />
              {errors.jobTitle && <p className="text-red-500">Job title is required</p>}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input type="text" placeholder="Ex: Microsoft" {...register('companyName', { required: true })} className="create-job-input" />
              {errors.companyName && <p className="text-red-500">Company name is required</p>}
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input type="text" placeholder="£20k" {...register('minPrice')} className="create-job-input" />
              {/* {errors.minPrice && <p className="text-red-500">Minimum salary is required</p>} */}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input type="text" placeholder="£120k" {...register('maxPrice')} className="create-job-input" />
              {/* {errors.maxPrice && <p className="text-red-500">Maximum salary is required</p>} */}
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register('salaryType')} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Weekly">Weekly</option>
              </select>
              {/* {errors.salaryType && <p className="text-red-500">Salary type is required</p>} */}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input type="text" placeholder="Ex: Amsterdam" {...register('jobLocation', { required: true })} className="create-job-input" />
              {errors.jobLocation && <p className="text-red-500">Job location is required</p>}
            </div>
          </div>

          <div className="create-job-flex">
            {/* <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input type="date" {...register('jobPosting', { required: true })} className="create-job-input" />
              {errors.jobPosting && <p className="text-red-500">Job posting date is required</p>}
            </div> */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                {...register('jobPosting', { required: true })}
                className="create-job-input"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              {errors.jobPosting && <p className="text-red-500">Job posting date is required</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select {...register('experienceLevel', { required: true })} className="create-job-input">
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
              {errors.experienceLevel && <p className="text-red-500">Experience level is required</p>}
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Category</label>
              <select {...register('category', { required: true })} className="create-job-input">
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

          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <div className="flex">
                <input type="file" onChange={handleImageUpload} className="hidden" id="fileUpload" accept="image/*" />
                <label htmlFor="fileUpload" className="bg-sky-500 text-white px-4 py-2 rounded-sm cursor-pointer">Upload Image</label>
              </div>
              {image && <img src={image} alt="Uploaded logo" className="mt-2 w-32 h-32 object-cover" />}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select {...register('employmentType', { required: true })} className="create-job-input">
                <option value="">Choose your employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
                <option value="On-Site">On-Site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote ">Remote</option>
              </select>
              {errors.employmentType && <p className="text-red-500">Employment type is required</p>}
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input type="email" placeholder="Your Email" {...register('postedBy', { required: true })} className="create-job-input" />
            {errors.postedBy && <p className="text-red-500">Email is required</p>}
          </div>
          {/* <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <ReactQuill
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 h-72"
              placeholder="Describe the job responsibilities, requirements, etc."
              {...register('description', { required: true })}
            />
            {errors.description && <p className="text-red-500">Job description is required</p>}
          </div> */}
           <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Describe the job responsibilities, requirements, etc."
              {...register('description', { required: true })}
            />
            {errors.description && <p className="text-red-500">Job description is required</p>}
          </div>
        <input type="submit" disabled={isLoading} className="block mt-12 bg-sky-600 text-white font-semibold px-10 py-2 rounded-sm cursor-pointer" value={isLoading ? 'Submitting...' : 'Submit'} />
        </form>

      </div>
    </div>
  );
};

export default CreateJob;
