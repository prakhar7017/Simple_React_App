import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "../Service/Operation/auth.js"
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

    return (
        <div className="lg:w-[31.75rem] lg:h-[28rem] flex justify-center items-center mx-auto p-4 m-4">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-full max-w-md mx-auto mt-[7rem]">
                    <div className="">
                        <h1 className="text-[1.875rem] font-inter text-richblack-5 leading-[2.375rem] mb-4">Choose a new password</h1>
                        <p className="text-richblack-100 font-inter text-[1.125rem] leading-[1.625rem]">Almost done. Enter your new password and you're all set.</p>
                    </div>
                    <form onSubmit={handleOnSubmit} className="mt-8 flex flex-col gap-y-4" >
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New password<sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter New Password"
                                onChange={handleOnChange}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
                            </span>
                        </label>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm new password<sup className="text-pink-200">*</sup></p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Enter Confirm Password"
                                onChange={handleOnChange}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
                            </span>
                        </label>
                        <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblue-900">
                            Reset Password
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
    )
}

export default UpdatePassword;
