import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setSignupData } from "../../Slices/authSlice";
import checkPassword from "../../Util/passwordChecker";
import { signup } from "../../Service/Operation/auth";
import "animate.css";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;

  const handelOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Oppss!! Passwords Does not Match");
      return;
    }

    if (!checkPassword(password, 8)) {
      toast.error(
        "Oppss!! Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
      );
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    const signupData = {
      ...formData,
    };

    dispatch(
      signup(
        formData.email,
        formData.password,
        formData.confirmPassword,
        navigate
      )
    );

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handelOnSubmit}
      className="min-h-screen flex items-center justify-center gap-4 bg-gray-100"
    >
      <div className=" bg-transparent p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4 text-center gap-y-4 animate__animated animate__backInDown">
          Sign Up
        </h2>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handelOnChange}
            placeholder="Enter Email Address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className=" w-full  lg:w-[27.75rem] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            aria-label="Email Address"
          />
        </label>

        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handelOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full lg:w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handelOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full lg:w-[13.25rem] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2 text-white"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span className="text-sm text-white">
            I agree to the terms and conditions
          </span>
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 lg:w-[27.75rem] animate__animated animate__backInUp"
          aria-label="Sign Up Button"
        >
          SignUp
        </button>
      </div>
    </form>
  );
}

export default SignUp;
