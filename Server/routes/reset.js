import express from "express";
import {resetPasswordToken,resetPassword} from "../controller/reset.js"


const router=express.Router();

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-Password",resetPassword);

export default router;