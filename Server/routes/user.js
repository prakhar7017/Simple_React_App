import express from "express";
import {postLogin,postSignup} from "../controller/auth.js";
import auth_middleware from "../middlware/auth.js";

const router=express.Router();

router.post("/login",postLogin);

router.post("/signup",postSignup);

export default router;