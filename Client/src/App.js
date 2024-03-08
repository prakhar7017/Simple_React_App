import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Core/Auth/Login";
import SignUp from "./Core/Auth/Signup";
import OpenRoute from "./Core/Auth/OpenRoute";
import Posts from "./Pages/Post";
import Navbar from "./Components/Common/Navbar";
import ForgotPassword from "./Pages/forgetPass";
import UpdatePassword from "./Pages/updatePass";
import PrivateRoute from "./Core/Auth/ProtectedRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
