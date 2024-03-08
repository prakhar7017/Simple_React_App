import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PrivateRoute=({children})=>{
    const naviagte=useNavigate();
    const {token}=useSelector((state)=>state.auth);

    if(token!=null){
        return children;
    }else{
        naviagte("/login")
    }

}

export default PrivateRoute;