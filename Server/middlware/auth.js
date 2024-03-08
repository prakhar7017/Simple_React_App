import jwt from "jsonwebtoken";
import User from "../model/user.js";

//auth
const isAuthenticated=async (req,res,next)=>{
    try {       
        const token= req.cookies.token || req.body.token || req.get("Authorization").replace("Bearer ","");
        // console.log("backend token",token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }
        try {
            // console.log("hiii")
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decode);
            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message :"something went wrong"
        })
    }
}

export default isAuthenticated;