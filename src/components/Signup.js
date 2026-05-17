import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/BASE_URL";
import toast, { Toaster } from "react-hot-toast";

const SignUp = ({ setsignupOpen, setLoginOpen }) => {
    const contentRef = useRef(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [resendEnabled, setResendEnabled] = useState(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const close = () => {
        setsignupOpen(false);
    };

    const openLogin = () => {
        setLoginOpen(true);
        setsignupOpen(false);
    };

    const handleChange = (field, value) => {
        setUser((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("OTP sent to your email. Please verify.");
                setOtpSent(true);
            } else {
                toast.error(data?.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
            toast.error("An error occurred during signup. Please try again later.");
        }
    };

    const handleInputChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const otpArray = pastedData.split("").slice(0, otp.length);

        const newOtp = [...otp];
        otpArray.forEach((char, index) => {
            if (!isNaN(char) && index < newOtp.length) {
                newOtp[index] = char;
            }
        });

        setOtp(newOtp);

        const nextIndex = otpArray.length;
        if (nextIndex < otp.length) {
            document.getElementById(`otp-input-${nextIndex}`).focus();
        }
    };


    const handleVerifyOtp = async () => {
        if (!otp || otp.length < 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    otp,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                }),
            });

            if (response.ok) {
                toast.success("Account created successfully!");
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                });
                setsignupOpen(false);
            } else {
                const data = await response.json();
                toast.error(data?.message || "OTP verification failed.");
            }
        } catch (error) {
            console.error("Error during OTP verification:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    const handleResendOtp = async () => {
        setOtp(["", "", "", "", "", ""])
        setResendEnabled(false);
        setTimeout(() => setResendEnabled(true), 30000);
        try {
            const response = await fetch(`${BASE_URL}/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || "OTP resent successfully!");
            } else {
                toast.error(data.message || "Failed to resend OTP.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            toast.error("An error occurred while resending the OTP.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                setsignupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setsignupOpen]);

    return (
        <>
            <Toaster />
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white p-5 rounded-lg w-full max-w-md relative" ref={contentRef}>
                    <button className="absolute top-0 right-0 m-3" onClick={close}>
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {!otpSent ? (
                        <>
                            <h2 className="text-gray-600 text-lg font-medium">First Time Here?</h2>
                            <p className="text-gray-500 text-xs m-1">
                                Create a new account to get Updates jobs
                            </p>
                            <form onSubmit={handleSubmit} className="form">
                                <input
                                    value={user?.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    className="p-3 my-2 outline-none border border-gray-300 text-black w-full"
                                    type="text"
                                    required
                                    placeholder="First Name"
                                />
                                <input
                                    value={user?.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    className="p-3 my-2 outline-none border border-gray-300 w-full"
                                    type="text"
                                    required
                                    placeholder="Last Name"
                                />
                                <input
                                    value={user?.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="p-3 my-2 outline-none border border-gray-300 w-full"
                                    type="email"
                                    required
                                    placeholder="Email"
                                />
                                <input
                                    value={user?.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    className="p-3 my-2 outline-none border border-gray-300 w-full"
                                    type="password"
                                    required
                                    placeholder="Password"
                                />
                                <input
                                    value={user?.phoneNumber}
                                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                                    className="p-3 my-2 outline-none border border-gray-300 w-full"
                                    type="number"
                                    required
                                    placeholder="Phone Number"
                                />
                                <button
                                    type="submit"
                                    className="p-2 w-full border border-gray-300 bg-sky-500 text-white my-2 hover:text-gray-800"
                                >
                                    Create a new account
                                </button>
                            </form>
                            <p className="text-gray-800 my-3 text-xs">
                                Already have an account?{" "}
                                <span onClick={openLogin} className="border-b border-gray-300 cursor-pointer font-bold">
                                    Log In
                                </span>{" "}
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col items-center justify-center">
                                <div className="bg-white p-6 rounded-md w-96 text-center">
                                    <div className="mb-4">
                                        <div className="bg-sky-100 p-3 rounded-full inline-block">
                                            <svg
                                                className="w-6 h-6 text-sky-500"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18.5A8.5 8.5 0 1 1 20.5 12 8.5 8.5 0 0 1 12 20.5zm-3-10.25h6a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V12h-4.5v3.25a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">Verify Your Email</h2>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Please Enter The Verification Code We Sent To{' '}
                                        <strong>{user?.email}</strong>
                                    </p>
                                    <div className="flex justify-center space-x-2 mb-4">
                                        {otp.map((value, index) => (
                                            <input
                                                key={index}
                                                id={`otp-input-${index}`}
                                                type="text"
                                                maxLength="1"
                                                value={value}
                                                onChange={(e) => handleInputChange(e.target.value, index)}
                                                onPaste={(e) => handlePaste(e)}
                                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded"
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleVerifyOtp}
                                        className="w-full bg-sky-500 text-white p-2 rounded-md font-semibold hover:bg-sky-600"
                                    >
                                        Confirm
                                    </button>
                                    <div className="mt-4">
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={!resendEnabled}
                                            className={`${resendEnabled ? 'text-sky-500' : 'text-gray-400'
                                                } font-bold underline cursor-pointer`}
                                        >
                                            Resend Code?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignUp;
