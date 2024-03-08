import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../Slices/authSlice";
import {setUser} from "../../Slices/profileSlice"

export const signup = (email, password, confirmPassword, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        email,
        password,
        confirmPassword,
      });


      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Yupiii !! Signup Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Oppss !! Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      toast.success("Yupiii !! Login Successfull");
      navigate("/post");
    } catch (error) {
      console.log(error);
      toast.error("Oppss !! login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const fetchPosts=async(token)=>{
    try {
      const response = await apiConnector("GET", endpoints.POST_API, null,{
      },{
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response?.data?.response;
    } catch (error) {
      console.log(error);
    }
}

export const logout=(navigate)=>{
  return (dispatch)=>{
      dispatch(setToken(null));
      localStorage.removeItem("token")
      toast.success("Logged Out !! Come Back Soon")
      navigate("/")
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {
        email,
      })


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}