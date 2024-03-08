import React from "react";
import 'animate.css';
import Button from "../Components/Common/Button";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-[3rem] font-bold mb-8 text-white animate__animated animate__backInDown">Welcome</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <Button active={true} linkto={"/login"} ariaLabel="Navigate to login page">
            Login
          </Button>
          <Button className={false} linkto={"/signup"} ariaLabel="Navigate to signup page">
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
