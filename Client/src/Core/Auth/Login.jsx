import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "animate.css";
import { login } from "../../Service/Operation/auth";
import { Link } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const handelOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOnSubmit = (e) => {
    e.preventDefault();
    function isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailPattern.test(email);
    }
    if (!isValidEmail(email)) {
      toast.error("Oppss!! Invalid Email Address");
      return;
    }
    dispatch(login(formData.email, formData.password, navigate));

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handelOnSubmit}
      className="min-h-screen flex items-center justify-center gap-4 bg-gray-100"
      aria-label="Login Form"
    >
      <div className=" bg-transparent p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4 text-center gap-y-4 animate__animated animate__backInDown">
          Login
        </h2>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address{" "}
            <sup className="text-pink-200" aria-hidden="true">
              *
            </sup>
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
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>

        <div className="mb-4 mt-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password{" "}
              <sup className="text-pink-200" aria-hidden="true">
                *
              </sup>
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
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              role="button"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-richblack-500">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 lg:w-[24rem] animate__animated animate__backInUp"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LogIn;
