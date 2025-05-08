import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/user.types";
 
export interface IUserDocument extends IUser,Document{}
 
const userSchema=new Schema<IUserDocument>(
  {
    firstName:{type:String,required:true,maxlength:50,trim:true},
    lastName:{type:String,required:true,maxlength:50,trim:true},
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      validate:{
        validator:(value:string)=>{
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message:"Invalid email format"
      }
    },
    password:{type:String,required:true},
    role:{type:String,required:true},
    preferableActivity:{type:String},
    target:{type:String},
    about:{type:String},
    rating:{type:Number,default:0},
    specializations:[{type:String}],
  },
  {timestamps:true}
)
 
const User=mongoose.model<IUserDocument>("User",userSchema);
export default User;