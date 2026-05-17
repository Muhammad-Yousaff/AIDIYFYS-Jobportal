import React, { useState } from "react";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils/BASE_URL";

const ForgotPass = ({ setForgotPasswordOpen, setLoginOpen }) => {
    const [forgotEmail, setForgotEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: forgotEmail }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Email Sent!",
                    text: "Check your email for password reset instructions.",
                    timer: 3000,
                    showConfirmButton: false,
                });
                setForgotEmail("");
                setForgotPasswordOpen(false);
                setLoginOpen(false)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email not found. Please try again.",
                });
            }
        } catch (error) {
            console.error("Error occurred during password reset:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred. Please try again later.",
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                <button
                    className="absolute top-0 right-0 m-3"
                    onClick={() => setForgotPasswordOpen(false)}
                >
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-gray-600 text-lg font-medium mb-4">Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        className="p-2 w-full border border-gray-300 outline-none my-2"
                    />
                    <button
                        type="submit"
                        className="p-2 w-full border border-gray-300 outline-none bg-sky-500 text-white my-2"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;
