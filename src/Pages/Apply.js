import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/BASE_URL"

const Apply = ({ setIsApplyOpen, companyInfo }) => {
    const contentRef = useRef(null);
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        coverLetter: '',
        name: '',
        cvFile: null
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };
    const close = () => {
        setIsApplyOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = new FormData();
        form.append('name', formData?.name);
        form.append('email', formData?.email);
        form.append('coverLetter', formData?.coverLetter);
        form.append('cvFile', formData?.cvFile);
        form.append('companyemail', companyInfo?.postedBy);
        form.append('companyname', companyInfo?.companyName);
        form.append('companyjob', companyInfo?.jobTitle);
        form.append('jobId', companyInfo?._id);

        try {
            const response = await fetch(`${BASE_URL}/apply`, {
                method: 'POST',
                body: form,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit application.');
            }
            Swal.fire({
                icon: 'success',
                title: 'Application submitted successfully!',
                timer: 2000,
                showConfirmButton: false,
            });

            setFormData({
                email: '',
                coverLetter: '',
                name: '',
                cvFile: null,
            });
            setIsApplyOpen(false);
            navigate('/user-applied-jobs');

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message || 'Failed to submit application.',
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 mt-20 z-50">
            <div className="relative bg-white p-6 rounded-lg w-full max-w-md" ref={contentRef}>
                <button className="absolute top-0 right-0 m-3" onClick={close}>
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-2xl font-semibold mb-4">Apply for Job</h1>
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <img src="/images/loader.gif" alt="Loading..." style={{ height: "300px" }} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold">Name</label>
                            <input type="name" name="name" value={formData.name} onChange={handleChange} required className="block w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Cover Letter</label>
                            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} required className="block w-full border border-gray-300 rounded px-3 py-2"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Upload Your CV</label>
                            <input type="file" name="cvFile" onChange={handleChange} required className="block w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <button type="submit" className="p-2 w-full flex justify-center text-center items-center border border-gray-300 outline-none bg-sky-500 text-white my-2">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Apply;
