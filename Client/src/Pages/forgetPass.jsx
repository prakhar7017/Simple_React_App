import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../Service/Operation/auth";

const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState("");
    const dispatch = useDispatch();

    const handelOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className="lg:w-[31.75rem] lg:h-[28rem] flex justify-center items-center mx-auto p-4 m-4">
            {loading ? (
                <div>loading..</div>
            ) : (
                <div className="w-full max-w-[27.75rem] flex flex-col justify-between mx-auto py-6 mt-8">
                    <h1 className="text-[1.875rem] font-inter text-richblack-5 leading-[2.375rem] mb-4">
                        {!emailSent ? "Reset your password" : "Check email"}
                    </h1>

                    <p className="text-richblack-100 font-inter text-[1.125rem] leading-[1.625rem]">
                        {!emailSent
                            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`}
                    </p>

                    <form className="mt-8" onSubmit={handelOnSubmit}>
                        {!emailSent && (
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email Address"
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblue-900 w-full"
                        >
                            {!emailSent ? "Reset Password" : "Resend email"}
                        </button>
                    </form>

                    <div className="mt-4">
                        <Link to="/login">
                            <div className="flex flex-row text-[1rem] font-inter text-richblack-5 gap-x-2 justify-start items-center">
                                <AiOutlineArrowLeft />
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
