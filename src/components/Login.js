import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/BASE_URL";
import ForgotPass from "../Pages/ForgotPass";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const Login = ({ setLoginOpen, setsignupOpen, setUserName }) => {
    const contentRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [ForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const close = () => {
        setLoginOpen(false);
    };

    const open = () => {
        setsignupOpen(true);
        setLoginOpen(false);
    };

    const ForgotOpen = () => {
        setForgotPasswordOpen(true);
        // setLoginOpen(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', data?.name);
                localStorage.setItem('userToken', data?.token);
                localStorage.setItem('UserId', data?.userId);
                localStorage.setItem("likedJobs", JSON.stringify(data.likedJobs));
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    timer: 2000,
                    showConfirmButton: false
                });

                setEmail("");
                setPassword("");
                setLoginOpen(false);
                setUserName(data?.name);
                window.location.reload();

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password. Please try again.'
                });
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred during login. Please try again later.'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (contentRef.current && !contentRef.current.contains(event.target)) {
    //             setLoginOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [setLoginOpen]);

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white rounded-lg p-8 max-w-md w-full relative" ref={contentRef}>
                    {/* Close Button */}
                    <button className="absolute top-0 right-0 m-3" onClick={close}>
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex justify-between items-center pr-5 pl-5">
                        <h2 className="text-gray-600 text-lg font-medium">Login</h2>
                    </div>

                    <div className="content p-5 flex flex-col justify-center overflow-hidden">
                        <div className="break h-1 bg-gray-300 my-2"></div>
                        <form onSubmit={handleLogin} className="form">
                            <div className="inputBox">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email"
                                    className="p-2 w-full border border-gray-300 outline-none my-2"
                                />
                            </div>
                            <div className="inputBox relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                    className="p-2 w-full border border-gray-300 outline-none my-2"
                                />
                                <span
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </span>
                            </div>
                            <div className="links">
                                <button
                                    type="button"
                                    onClick={ForgotOpen}
                                    className="block text-gray-500 font-semibold text-sm underline focus:outline-none"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="p-2 w-full border border-gray-300 outline-none bg-sky-500 text-white my-2"
                            >
                                Login
                            </button>
                            <p className="text-gray-500 text-sm font-semibold">Don&apos;t have an account?</p>
                            <button
                                type="button"
                                onClick={open}
                                className="p-2 w-full border  border-gray-300 outline-none text-green my-2 hover:bg-sky-500 hover:text-white"
                            >
                                Create a new account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {ForgotPasswordOpen && (
                <ForgotPass
                    setForgotPasswordOpen={setForgotPasswordOpen}
                    setLoginOpen={setLoginOpen}
                />
            )}
        </>
    );
};

export default Login;
