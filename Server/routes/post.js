import express from "express";
import {getPosts} from "../controller/post.js";
import auth_middleware from "../middlware/auth.js";

const router=express.Router();


router.get("/getPost",getPosts);

export default router;  