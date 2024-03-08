import User from "../model/user.js";
import mailSender from "../util/mailSender.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// sendOTP
export const sendOTP=async(req,res)=>{
    try {
        const {email}=req.body;

        const user_ifPresent=await User.findOne({email:email});

        if(user_ifPresent){
            return res.status(401).json({
                success:false,
                message:"User already Registered"
            })
        }
        // otp generate
        let otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            digits:true,
        })

        const otp_ifPresent=await OTP.findOne({
            otp:otp
        })

        while(otp_ifPresent){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
                digits:true,
            });
            otp_ifPresent=await OTP.findOne({
                otp:otp
            })
        }

        const otp_doc=await OTP.create({
            email,
            otp,
        })

        await mailSender(email,"Verification",otpTemplate(otp))

        res.status(200).json({
            success:true,
            message:"OTP Sent SuccessFully",otp
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
        
    }
}
// signup
export const postSignup=async (req,res)=>{
   try {
     //data fetch
     const {email,password,confirmPassword}=req.body;
    // data validate
if(!email || !password || !confirmPassword){
        return res.status(403).json({
            success:false,
            message:"ALL fields are required"
        })
    }
    // 2 password match karlo
    if(password!==confirmPassword){
        return res.status(400).json({
            succes:false,
            message:"Password and Confirm Password Does not match"
        })
    }
    // check user already exists
    const existingUser=await User.findOne({email})

    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User Already exist"
        })
    }
    // hash password
    const hashedPassword=await bcrypt.hash(password,10);
    if(!hashedPassword){
        return res.status(400).json({
            success:false,
            message:"Password Cannot be Hashed"
        })
    }
    const user=await User.create({email,password:hashedPassword})
    await mailSender(email,"Registered","Thanks For Registering with us")
    // respone
    return res.status(201).json({
        success:true,
        message:"User is Registered SuccessFully",
        user
    })
   } catch (error) {
    // console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error",

    })
   }
}
// login
export const postLogin=async(req,res)=>{
    try {
        // get data
        const {email,password}=req.body;
        // validate data
        if(!email ||!password){
            return res.status(403).json({
                success:true,
                message:"All Fields are Required"
            })
        }
        // user check exist or not
        const existUser=await User.findOne({email})
        if(!existUser){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            })
        }
        // password ko compare kar leya
        if(! await bcrypt.compare(password,existUser.password)){
            return res.status(401).json({
                success:false,
                message:"Email or Password is Wrong"
            })
        }
        // generate JWT token
        let payload={
            email:existUser.email,
            id:existUser._id,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"24h"
        })
        // response
        let option={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,option).status(200).json({
            success:true,
            token,
            existUser,
            message:"logged in Successfully"
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
