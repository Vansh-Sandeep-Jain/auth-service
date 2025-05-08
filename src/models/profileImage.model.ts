import mongoose, { Schema, Document } from "mongoose";
import { IProfileImage } from "../types/profileImage.types";
 
export interface IProfileImageDocument extends IProfileImage,Document{}
 
const profileImageSchema=new Schema<IProfileImageDocument>(
  {
    userId:{type:String,required:true,trim:false},
    base64encodedImage:{type:String,required:true,trim:false},
  },
  {timestamps:true}
)
 
const ProfileImage=mongoose.model<IProfileImageDocument>("ProfileImage",profileImageSchema);
export default ProfileImage;