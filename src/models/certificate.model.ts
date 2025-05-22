import mongoose, { Schema, Document } from "mongoose";
import { ICertificate } from "../types/certificate.types";

export interface ICertificateDocument extends ICertificate, Document {}

const certificateSchema = new Schema<ICertificateDocument>(
  {
    userId: { type: String, required: true, trim: false },
    base64encodedFile: { type: String, required: true, trim: false },
  },
  { timestamps: true }
);

const Certificate = mongoose.model<ICertificateDocument>(
  "Certificate",
  certificateSchema
);
export default Certificate;
