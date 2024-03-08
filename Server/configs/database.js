import mongoose from 'mongoose';

export const connect=()=>{
    mongoose.connect(process.env.DB_URL,{
    }).then(()=>console.log("Database Connected")).catch(error=>{
        console.log("error in db connection",error);
        throw error;
    })
}