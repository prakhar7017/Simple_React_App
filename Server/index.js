import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
const PORT=process.env.PORT || 8000;
import {connect} from './configs/database.js';
import { rateLimit } from 'express-rate-limit'
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import restRoute from './routes/reset.js';

const app=express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100, 
    standardHeaders: 'draft-7', 
    legacyHeaders: false,
})
app.set('trust proxy', true);
// app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*",
    methods: ["GET", "POST","PUT","DELETE","PATCH"],
    credentials:true,
}))
app.use(limiter);
app.use("/user",userRoutes);
app.use("/post",postRoutes);
app.use("/reset",restRoute);

app.get("/health",(req,res,)=>{
    res.status(200).json({
      status:"success",
      message:"Backend is on"
    })
})

// const createPost=async()=>{
//     console.log("here")
//     const data=await fetch("https://fakerapi.it/api/v1/texts?_quantity=1&_characters=350&_quantity=100");
//     const response=await data.json();
//     await Post.insertMany(response.data);
//     console.log("Post Created");
// }

// createPost();

connect();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})