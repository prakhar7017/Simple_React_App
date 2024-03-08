import mongoose from 'mongoose';
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date
    },
    fistName:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true})

export default mongoose.model("User",UserSchema);