import mongoose from 'mongoose';
const PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true})

export default mongoose.model("Post",PostSchema);