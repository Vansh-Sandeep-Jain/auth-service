import mongoose, { Schema, Document } from "mongoose";
import { ICoachList } from "../types/coachList.types";
 
export interface ICoachListDocument extends ICoachList,Document{}
 
const coachList=new Schema<ICoachListDocument>(
  {
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
  },
  {timestamps:true}
)
 
const CoachList=mongoose.model<ICoachListDocument>("CoachList",coachList);

export default CoachList;